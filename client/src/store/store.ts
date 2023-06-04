import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";

import storage from "redux-persist/lib/storage";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { createWrapper } from "next-redux-wrapper";

import log from "./middleware/log";
import api from "./middleware/apiMiddleware";

const rootReducer = combineReducers({
  [authSlice.name]: authSlice.reducer,
});

const makeConfiguredStore = () =>
  configureStore({
    reducer: {
      auth: authSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), log, api],
  });

export const makeStore = () => {
  const isServer = typeof window === "undefined";
  if (isServer) {
    return makeConfiguredStore();
  } else {
    // we need it only on client side
    const persistConfig = {
      key: "nextjs",
      whitelist: ["auth"], // make sure it does not clash with server keys
      storage: AsyncStorage,
    };
    const persistedReducer = persistReducer(persistConfig, rootReducer);
    let store: any = configureStore({
      reducer: persistedReducer,
      devTools: process.env.NODE_ENV !== "production",
      middleware: (getDefaultMiddleware) => [
        ...getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
        }),
        log,
        api,
      ],
    });
    store.__persistor = persistStore(store);
    return store;
  }
};

export type AppState = ReturnType<AppStore["getState"]>;
export type AppStore = ReturnType<typeof makeStore>;

export const wrapper = createWrapper<AppStore>(makeStore);

// Previous codes

// const store = configureStore({
//   reducer: {
//     user: userReducer,
//   },
// });

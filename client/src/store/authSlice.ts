import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AuthType, SingInData, SingUpData, Tokens } from "../types";
import jwt, { JwtPayload } from "jsonwebtoken";
import { apiCallBegan } from "./api";
import { settings } from "../utils/settings";
import { HYDRATE } from "next-redux-wrapper";
import { AppState } from "./store";

export interface User {
  name: string;
  accessToken: string;
  refreshToken: string;
  isAuthenticated: boolean;
  loading: boolean;
  error: string[];
}

const initialState: User = {
  name: "",
  accessToken: "",
  refreshToken: "",
  isAuthenticated: false,
  loading: false,
  error: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // apiRequested: (state, action) => {
    //   return {
    //     ...state,
    //     loading: true,
    //   };
    // },
    apiRequestedFail: (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    },
    setUser: (state, action: PayloadAction<User>) => {
      const at = action.payload.accessToken;
      const decodedToken = jwt.decode(at) as JwtPayload;
      const name = decodedToken.name;

      return {
        ...state,
        accessToken: at,
        refreshToken: action.payload.refreshToken,
        name: name,
        isAuthenticated: true,
        loading: false,
        error: [],
      };
    },

    removeError: (state) => {
      return { ...state, error: [] };
    },

    logout: (state) => {
      return {
        ...state,
        accessToken: "",
        refreshToken: "",
        isAuthenticated: false,
        error: [],
      };
    },

    refresh: (state, action: PayloadAction<Tokens>) => {
      return {
        ...state,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
        isAuthenticated: true,
      };
    },
  },

  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.auth,
      };
    },
  },
});

export default authSlice;

//action creators

export const {
  setUser,
  // apiRequested,
  apiRequestedFail,
  removeError,
  logout,
  refresh,
} = authSlice.actions;

export const createAccount = (payload: SingUpData) =>
  apiCallBegan({
    url: `${settings.authorizationApi}${AuthType.SignUp}`,
    method: "POST",
    onStart: "",
    onSuccess: setUser.type,
    onError: apiRequestedFail.type,
    data: payload,
  });

export const login = (payload: SingInData) =>
  apiCallBegan({
    url: `${settings.authorizationApi}${AuthType.SignIn}`,
    method: "POST",
    onStart: "",
    onSuccess: setUser.type,
    onError: apiRequestedFail.type,
    data: payload,
  });

//selectors
export const selectAuthState = (state: AppState) => state.auth;

// export const fetchUser = createAsyncThunk(
//   "fetchUser",
//   async (payload: SingInData) => {
//     return signIn(payload.name, payload.password);
//   }
// );

// extraReducers: (builder) => {
//   builder.addCase(HYDRATE, (state, action) => {
//       return {
//         ...state,
//         ...action.payload.auth,
//       };
//     },);
// }
//   builder.addCase(fetchUser.pending, (state) => {
//     state.loading = true;
//   });
// },

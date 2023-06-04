import "@/src/styles/globals.css";
import type { AppProps } from "next/app";
import { PersistGate } from "redux-persist/integration/react";
import { wrapper } from "@/src/store/store";
import Layout from "@/src/components/Layout";
import { Provider } from "react-redux";

function MyApp({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <Provider store={store}>
      <PersistGate persistor={store.__persistor} loading={<div>Loading</div>}>
        <Layout>
          <Component {...props.pageProps} />;
        </Layout>
      </PersistGate>
    </Provider>
  );
}
export default MyApp;

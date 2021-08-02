import React from "react";
import App from "next/app";
import { wrapper } from "../store";
import { getSession, Provider } from "next-auth/client";
import Layout from "../components/layout/layout";
import "../styles/globals.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { setFetchedCategories } from "../features/category/categoryActions";

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    const queryClient = new QueryClient();

    return (
      <Provider session={pageProps.session}>
        <QueryClientProvider client={queryClient}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </QueryClientProvider>
      </Provider>
    );
  }

  static getInitialProps = wrapper.getInitialAppProps(
    (store) =>
      async ({ Component, ctx }) => {
        await store.dispatch(setFetchedCategories());

        const session = await getSession({ req: ctx.req });

        if (session) {
          return {
            pageProps: {
              ...(Component.getInitialProps
                ? await Component.getInitialProps({ ...ctx, store })
                : {}),
              pathname: ctx.pathname,
              session: session,
            },
          };
        }

        return {
          pageProps: {
            ...(Component.getInitialProps
              ? await Component.getInitialProps({ ...ctx, store })
              : {}),
            pathname: ctx.pathname,
          },
        };
      }
  );
}

export default wrapper.withRedux(MyApp);

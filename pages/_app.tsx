import "@/styles/globals.css";
import {
  FluentProvider,
  webDarkTheme,
  Theme,
  createDOMRenderer,
  GriffelRenderer,
  SSRProvider,
  RendererProvider,
  webLightTheme,
} from "@fluentui/react-components";
import theme from "@/config/theme.json";
import Head from "next/head";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { PagesProgressBar as ProgressBar } from "next-nprogress-bar";
import type { AppProps } from "next/app";

export const protopieTheme: Theme = {
  ...webDarkTheme,
  ...theme,
};

const queryClient = new QueryClient();

type EnhancedAppProps = AppProps & { renderer?: GriffelRenderer };

export default function App({
  Component,
  pageProps,
  renderer,
}: EnhancedAppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <RendererProvider renderer={renderer || createDOMRenderer()}>
        <SSRProvider>
          <FluentProvider dir="rtl" theme={protopieTheme}>
            <QueryClientProvider client={queryClient}>
              <Component {...pageProps} />
              <ProgressBar
                height="4px"
                color="#7d6fe2"
                options={{ showSpinner: false }}
                shallowRouting
              />
            </QueryClientProvider>
          </FluentProvider>
        </SSRProvider>
      </RendererProvider>
    </>
  );
}

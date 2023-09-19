import theme from "@/config/theme.json";
import "@/styles/globals.css";
import {
  FluentProvider,
  GriffelRenderer,
  RendererProvider,
  SSRProvider,
  Theme,
  createDOMRenderer,
  webDarkTheme,
} from "@fluentui/react-components";
import { PagesProgressBar as ProgressBar } from "next-nprogress-bar";
import type { AppProps } from "next/app";
import Head from "next/head";
import { GoogleAnalytics } from "nextjs-google-analytics";
import { QueryClient, QueryClientProvider } from "react-query";

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
              <GoogleAnalytics trackPageViews />
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

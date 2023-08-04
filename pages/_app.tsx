import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { FluentProvider, webDarkTheme, Theme } from "@fluentui/react-components";
import theme from "@/config/theme.json";
import Head from "next/head";

export const protopieTheme: Theme = {
  ...webDarkTheme,
  ...theme,
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <FluentProvider dir="rtl" theme={protopieTheme}>
        <Component {...pageProps} />
      </FluentProvider>
    </>
  );
}

import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { FluentProvider, webDarkTheme, Theme } from "@fluentui/react-components";
import theme from "@/config/theme.json";
export const customLightTheme: Theme = {
  ...webDarkTheme,
  ...theme,
};
export default function App({ Component, pageProps }: AppProps) {
  return (
    <FluentProvider dir="rtl" theme={customLightTheme}>
      <Component {...pageProps} />
    </FluentProvider>
  );
}

import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { FluentProvider, webLightTheme, Theme } from "@fluentui/react-components";
export const customLightTheme: Theme = {
  ...webLightTheme,
  // borderRadiusMedium: "8px", // overriden token
};
export default function App({ Component, pageProps }: AppProps) {
  return (
    <FluentProvider dir="rtl" theme={customLightTheme}>
      <Component {...pageProps} />
    </FluentProvider>
  );
}

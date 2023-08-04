import {
    themeToTokensObject,
    Theme,
    webDarkTheme,
  } from "@fluentui/react-components";
  import theme from "@/config/theme.json";
  export const protopieTheme: Theme = {
    ...webDarkTheme,
    ...theme,
  };
  
  export default themeToTokensObject(protopieTheme);
  
import {
  createDOMRenderer,
  renderToStyleElements,
} from "@fluentui/react-components";
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";
import { ServerStyleSheet } from "styled-components";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const renderer = createDOMRenderer();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) =>
            function EnhancedApp(props) {
              const enhancedProps = {
                ...props,
                renderer,
              };

              return sheet.collectStyles(<App {...enhancedProps} />);
            },
        });

      const initialProps = await Document.getInitialProps(ctx);
      const styles = renderToStyleElements(renderer);

      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
            {styles}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang="fa">
        <Head>
          <link
            rel="preload"
            href="/fonts/YekanBakh-VF.ttf"
            as="font"
            crossOrigin=""
          />
          <link
            rel="preload"
            href="/fonts/YekanBakh-FaNum.woff"
            as="font"
            crossOrigin=""
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

// import Document, { DocumentContext } from "next/document";
// import { ServerStyleSheet } from "styled-components";

// export default class MyDocument extends Document {
//   static async getInitialProps(ctx: DocumentContext) {
//     const sheet = new ServerStyleSheet();
//     const originalRenderPage = ctx.renderPage;

//     try {
//       ctx.renderPage = () =>
//         originalRenderPage({
//           enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
//         });

//       const initialProps = await Document.getInitialProps(ctx);
//       return {
//         ...initialProps,
//         styles: (
//           <>
//             {initialProps.styles}
//             {sheet.getStyleElement()}
//           </>
//         ),
//       };
//     } finally {
//       sheet.seal();
//     }
//   }
// }
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

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    // 👇 creates a renderer that will be used for SSR
    const renderer = createDOMRenderer();
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) =>
          function EnhancedApp(props) {
            const enhancedProps = {
              ...props,
              // 👇 this is required to provide a proper renderer instance
              renderer,
            };

            return <App {...enhancedProps} />;
          },
      });

    const initialProps = await Document.getInitialProps(ctx);
    const styles = renderToStyleElements(renderer);

    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          {/* 👇 adding Fluent UI styles elements to output */}
          {styles}
        </>
      ),
    };
  }

  render() {
    return (
      <Html>
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

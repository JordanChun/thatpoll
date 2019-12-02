import cookies from 'next-cookies'

// _document is only rendered on the server side and not on the client side
// Event handlers like onClick can't be added to this file

// ./pages/_document.js
import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);

    if (ctx.req && ctx.req.headers) {
      let { theme } = cookies(ctx)

      if (theme !== 'light' && theme !== 'dark') {
        theme = 'light'
      };
      initialProps.theme = theme;
    }

    return { ...initialProps }
  }

  render() {
    return (
      <Html data-theme={this.props.theme}>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument

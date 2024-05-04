import Document, { Html, Head, Main, NextScript } from 'next/document'



export const metadata = {
  title: 'Persons - Finder',
  description: 'A professional website for finding persons',
  lang: 'en',
  favicon: '/favicon.svg',
  charSet: 'UTF-8'
}

class MyDocument extends Document {
  render() {
    return (
      <Html lang={metadata.lang}>
        <Head>
          <meta charSet={metadata.charSet} />
          <meta name="description" content={metadata.description} />
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
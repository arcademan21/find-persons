import Document, { Html, Head, Main, NextScript } from 'next/document'
import CookieConsent from "react-cookie-consent"


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
          <CookieConsent
              location="bottom"
              buttonText="Sure man!!"
              cookieName="myAwesomeCookieName2"
              style={{ background: "#2B373B" }}
              buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
              expires={150}
          >
              This website uses cookies to enhance the user experience.{" "}
              <span style={{ fontSize: "10px" }}>
                  This bit of text is smaller :O
              </span>
          </CookieConsent>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
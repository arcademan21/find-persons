
import { GlobalProvider } from '../context/GlobalContext'
import { ToastContainer } from 'react-toastify'
import Loader from "../components/Loader"
import Header from "../components/Header"
import Footer from "../components/Footer"
import Script from 'next/script'

export const metadata = {
  title: 'Find - Persons',
  description: 'A professional website for finding persons',
  lang: 'en',
  favicon: '/images/cropped-lupa-favicon.jpeg',
  charSet: 'UTF-8'
}

function RootLayout( { children } ) {

  return ( 

    <html lang={metadata.lang}>

      <head>
            
          <meta charSet={metadata.charSet} />
          <meta name="description" content={metadata.description} />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />


          <title> {metadata.title} </title>

          <link rel="icon" type="image/jpeg" href={metadata.favicon} />
          <link rel="stylesheet" type="text/css" href="/libs/bootstrap/css/bootstrap.min.css" />
          <link rel="stylesheet" type="text/css" href="/libs/animate/animate.css" />
          <link rel="stylesheet" type="text/css" href="/libs/owl-carousel/owl.carousel.css" />
          <link rel="stylesheet" type="text/css" href="/css/globals.css" />
          
          
          {/* Google tag (gtag.js) ADWORDS */}
          <script async src="https://www.googletagmanager.com/gtag/js?id=AW-340874452"></script>
          <script dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-340874452');
            `
          }} />

          {/*  Google tag (gtag.js) ANALYTICS */}
          <script async src="https://www.googletagmanager.com/gtag/js?id=G-L7GD5WN3YR"></script>
          <script
              dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-L7GD5WN3YR');
              `,
              }}
          />

          

      </head>

      <body>

          <GlobalProvider>
                
                <Loader />
                
                <ToastContainer 
                    position="top-center"
                    theme="colored"
                    limit={1}
                />

                

                <Header />
              
                <div className="container-fluid mb-5">
                  <div className="row">
                      <div className='col-12 p-0' > 

                          { children } 
                        
                      </div>
                  </div>
                </div>
              
                <Footer />
          </GlobalProvider>

          <Script type="text/javascript" src="/libs/jquery/jquery.min.js" />
          <Script type="text/javascript" src="/libs/bootstrap/js/bootstrap.min.js" />
          <Script type="text/javascript" src="/libs/bootstrap/js/bootstrap.bundle.min.js" />
          <Script type="text/javascript" src="/libs/owl-carousel/owl.carousel.min.js" />
          <Script type="text/javascript" src="/libs/waypoints/jquery.waypoints.min.js" />
          <Script type="text/javascript" src="/libs/animateNumber/jquery.animateNumber.min.js"  />

          
          <Script type="text/javascript" src="/js/theme.js" strategy='lazyOnload' />

          <Script type="text/javascript" src="/libs/wow/wow.min.js" strategy="beforeInteractive" />
          <Script type="text/javascript" src="/libs/wow/wow.init.js" strategy="afterInteractive" />

          <script dangerouslySetInnerHTML={{
            __html: `
            window._mfq = window._mfq || [];
            (function() {
                var mf = document.createElement("script");
                mf.type = "text/javascript"; mf.defer = true;
                mf.src = "//cdn.mouseflow.com/projects/b954db58-6476-4e67-8b81-d66b3eaa740f.js";
                document.getElementsByTagName("head")[0].appendChild(mf);
            })();
            `
        }}
        />      

      </body>
    </html>

  )

}

export default RootLayout




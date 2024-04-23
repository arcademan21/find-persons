
import { GlobalProvider } from '../context/GlobalContext'
import { ToastContainer } from 'react-toastify'
import Loader from "../components/Loader"
import Header from "../components/Header"
import Footer from "../components/Footer"
import Script from 'next/script'

export const metadata = {
  title: 'Persons - Finder',
  description: 'A professional website for finding persons',
  lang: 'en',
  favicon: '/favicon.svg',
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

          <link rel="icon" type="image/svg+xml" href={metadata.favicon} />
          <link rel="stylesheet" type="text/css" href="/libs/bootstrap/css/bootstrap.min.css" />
          <link rel="stylesheet" type="text/css" href="/libs/animate/animate.css" />
          <link rel="stylesheet" type="text/css" href="/libs/owl-carousel/owl.carousel.css" />
          <link rel="stylesheet" type="text/css" href="/libs/font-awesome/css/all.min.css" />
          <link rel="stylesheet" type="text/css" href="/css/globals.css" />
          
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
              
                <div className="container-fluid">
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
          <Script type="text/javascript" src="/libs/font-awesome/js/all.min.js"  />

          <Script type="text/javascript" src="/libs/vantajs/three.min.js" />
          <Script type="text/javascript" src="/libs/vantajs/vanta.globe.min.js" /> 
          <Script type="text/javascript" src="/js/theme.js" strategy='lazyOnload' />

          <Script type="text/javascript" src="/libs/wow/wow.min.js" strategy="beforeInteractive" />
          <Script type="text/javascript" src="/libs/wow/wow.init.js" strategy="afterInteractive" />
                   

      </body>
    </html>

  )

}

export default RootLayout




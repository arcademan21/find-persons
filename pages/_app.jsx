import { GlobalProvider } from '../src/context/GlobalContext'
import { ToastContainer } from 'react-toastify'
import Loader from "../src/components/Loader"
import Header from "../src/components/Header"
import Footer from "../src/components/Footer"
import Script from 'next/script'

function PersonsFinder({ Component, pageProps }) {
  return (<>
    <Loader />    
    <ToastContainer 
        position="top-center"
        theme="colored"
        limit={1}
    />
    <GlobalProvider>
        <Header />
        <Component {...pageProps} />
        <Footer />
    </GlobalProvider>
    <Script type="text/javascript" src="/libs/jquery/jquery.min.js"></Script>
    <Script type="text/javascript" src="/libs/bootstrap/js/bootstrap.min.js"></Script>
    <Script type="text/javascript" src="/libs/bootstrap/js/bootstrap.bundle.min.js"></Script>
    <Script type="text/javascript" src="/libs/owl-carousel/owl.carousel.min.js"></Script>
    <Script type="text/javascript" src="/libs/waypoints/jquery.waypoints.min.js"></Script>
    <Script type="text/javascript" src="/libs/animateNumber/jquery.animateNumber.min.js"></Script>
    <Script type="text/javascript" src="/libs/google-maps/google-maps.js"></Script>
    <Script type="text/javascript" src="/libs/html2pdf/html2pdf.js"></Script>
    <Script type="text/javascript" src="/libs/font-awesome/js/all.min.js"></Script>
    <Script type="text/javascript" src="/libs/vantajs/three.min.js" strategy='afterInteractive'></Script>
    <Script type="text/javascript" src="/libs/vantajs/vanta.globe.min.js" strategy='afterInteractive'></Script>
    <Script type="text/javascript" src="/libs/wow/wow.min.js"></Script>
    <Script type="text/javascript" src="/js/theme.js"></Script>

    <Script type="text/javascript" id='wowjs'>
        {/* Initiate the wowjs animation library */}
        new WOW().init() 
    </Script>

  </>);
}

export default PersonsFinder
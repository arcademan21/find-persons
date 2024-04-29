import { GlobalProvider } from '../src/context/GlobalContext'
import { ToastContainer } from 'react-toastify'
import Loader from "../src/components/Loader"
import Header from "../src/components/Header"
import Footer from "../src/components/Footer"
import Script from 'next/script'
import Head from 'next/head'

export const metadata = {
  title: 'Persons - Finder',
  description: 'A professional website for finding persons',
  lang: 'en',
  favicon: '/images/cropped-lupa-favicon.jpeg',
  charSet: 'UTF-8'
}

function PersonsFinder({ Component, pageProps }) {
  return (<>
    
    <Head>
        <meta charSet={metadata.charSet} />
        <meta name="description" content={metadata.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title> {metadata.title} </title>
        <link rel="icon" type="image/jpeg" href={metadata.favicon} />
        <link rel="stylesheet" type="text/css" href="/libs/bootstrap/css/bootstrap.min.css" />
        <link rel="stylesheet" type="text/css" href="/libs/animate/animate.css" />
        <link rel="stylesheet" type="text/css" href="/libs/owl-carousel/owl.carousel.css" />
        <link rel="stylesheet" type="text/css" href="/css/globals.css" />
    </Head>

    <Loader />

    <ToastContainer 
        position="top-center"
        theme="colored"
        limit={1}
    />
    
    <GlobalProvider>
        <Header />
        <Component { ...pageProps } />
        <Footer />
    </GlobalProvider>
    
    <Script type="text/javascript" src="/libs/jquery/jquery.min.js" strategy='beforeInteractive'/>
    <Script type="text/javascript" src="/libs/bootstrap/js/bootstrap.min.js" strategy='beforeInteractive'/>
    <Script type="text/javascript" src="/libs/bootstrap/js/bootstrap.bundle.min.js" strategy='beforeInteractive'/>
    <Script type="text/javascript" src="/libs/owl-carousel/owl.carousel.min.js" strategy='beforeInteractive'/>
    <Script type="text/javascript" src="/libs/waypoints/jquery.waypoints.min.js" strategy='beforeInteractive'/>
    <Script type="text/javascript" src="/libs/animateNumber/jquery.animateNumber.min.js"  strategy='beforeInteractive'/>
    
    <Script type="text/javascript" src="/js/theme.js" strategy='lazyOnload' />
    <Script type="text/javascript" src="/libs/wow/wow.min.js" strategy="beforeInteractive" />
    <Script type="text/javascript" src="/libs/wow/wow.init.js" strategy="afterInteractive" />
    
    

  </>)
}

export default PersonsFinder
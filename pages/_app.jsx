'use client'
import { GlobalProvider } from '../src/context/GlobalContext'
import { ToastContainer } from 'react-toastify'
import Loader from "../src/components/Loader"
import Header from "../src/components/Header"
import Footer from "../src/components/Footer"
import Script from 'next/script'
import Head from 'next/head'
import 'react-toastify/dist/ReactToastify.css'
//import {useEffect, useState} from 'react'

export const metadata = {
  title: 'Find - Persons',
  description: 'A professional website for finding persons',
  lang: 'en',
  favicon: '/images/cropped-lupa-favicon.jpeg',
  charSet: 'UTF-8'
}

function PersonsFinder({ Component, pageProps }) {

  //const [analiticsTag, setAnaliticsTag] = useState(null)

  // useEffect(() => {
  //   const extension = localStorage.getItem('extencion')
    
  //   if( extension === null || extension === undefined || extension === '/') 
  //     setAnaliticsTag(process.env.NEXT_PUBLIC_ANALYTICS_TAG_ES)
    
  //   else if( extension === '/es' )
  //     setAnaliticsTag(process.env.NEXT_PUBLIC_ANALYTICS_TAG_ES)

  //   else if( extension === '/it' ) 
  //     setAnaliticsTag(process.env.NEXT_PUBLIC_ANALYTICS_TAG_IT)
    
  //   else if( extension === '/fr' ) 
  //     setAnaliticsTag(process.env.NEXT_PUBLIC_ANALYTICS_TAG_FR)

  //   else if( extension === '/de' )
  //     setAnaliticsTag(process.env.NEXT_PUBLIC_ANALYTICS_TAG_DE)
    
  // }, [])
  
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

        {/* Google tag (gtag.js) ANALYTICS */}
        {/* <script 
        async 
        src={`https://www.googletagmanager.com/gtag/js?id=${analiticsTag}`}
        ></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', ${analiticsTag});
          `
        }} /> */}

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

    {/* <script dangerouslySetInnerHTML={{
      __html: `
      window._mfq = window._mfq || [];
      (function() {
          var mf = document.createElement("script");
          mf.type = "text/javascript"; mf.defer = true;
          mf.src = "//cdn.mouseflow.com/projects/b954db58-6476-4e67-8b81-d66b3eaa740f.js";
          document.getElementsByTagName("head")[0].appendChild(mf);
      })();
      `
    }} /> */}
    

  </>)

}

export default PersonsFinder
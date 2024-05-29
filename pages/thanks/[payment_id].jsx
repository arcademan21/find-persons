import { useEffect, useState, useContext } from 'react'
import GlobalContext from '@/context/GlobalContext'
import Image from 'next/image'

import { useRouter } from 'next/router'

const path_endpoint = process.env.NEXT_PUBLIC_PATH_END_POINT
//const convertions_gtag = process.env.NEXT_PUBLIC_CONVERTIONS_GTAG_ES

export const CheckTokenValidity = async ( token ) => {
    
    try{

        // Fetch to endpoint for get payment
        const req = await fetch( path_endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "petition" : {
                    "name": "validate_payment_token",
                    "data": {
                        "validate_payment_token": {
                            "payment_id": token
                        }
                    }
                }
            })
        })
        
        const res = await req.json()
        if( res.status === 'error' ) return false

    } catch ( error ) {
        return false
    }
    
    return true
    
}

export const InvalidateToken = async ( token ) => {
    
    try{

        // Fetch to endpoint for get payment
        const req = await fetch( path_endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "petition" : {
                    "name": "invalidate_payment_token",
                    "data": {
                        "invalidate_payment_token": {
                            "payment_id": token
                        }
                    }
                }
            })
        })
        
        const res = await req.json()
        if( res.status === 'error' ) return false

    } catch ( error ) {
        return false
    }
    
    return true


}

const ThanksPage = () => {

    const context = useContext( GlobalContext )
    const user = JSON.parse(localStorage.getItem('user'))
    const language = JSON.parse(localStorage.getItem('language_file'))
    const router = useRouter()
    const { payment_id } = router.query

    const [ counter, setCounter ] = useState( 5 )

    const timer = () => {
        const time = window.setInterval(() => {
            setCounter((prevCounter) => {
                if (prevCounter === 0) {
                    // Redirigiendo a la pagina de resultados
                    router.push('/results')
                    clearInterval( time )
                    return prevCounter
                } else {
                    return prevCounter - 1
                }
            })
        }, 1000)
    }

    useEffect(() => {

        CheckTokenValidity( payment_id )
        .then( async ( res ) => {
            
            if( !res ) {
                router.push('/')
                return false
            }

            // Cargando script de converciones en la cavecera
            // const script = document.createElement('script')
            // script.type = 'text/javascript'
            // script.innerHTML = convertions_gtag
            // document.head.appendChild( script )

            timer()

            return true

        })
        .catch( error => {
            router.push('/')
        })
        .finally( () => {
            InvalidateToken( payment_id )
        })

        

    }, [])

    return (<>

        {/* CONVERTIONS TAG */}
        <script async dangerouslySetInnerHTML={{
            __html: `
            //Event snippet for FIND-PERSONS.COM/ES conversion page
            gtag('event', 'conversion', {'send_to': 'AW-340874452/jL64CKiWxpkYENSpxaIB'})
            `
        }} />
        
        <div className="container-fluid h-100 wow fadeInUp " >
            <div className="row m-auto d-flex flex-column px-5 px-sm-2 justify-content-center align-items-center vh-100 py-5 w-75 " >
                <div className="col-md-12">

                    <div className="d-flex flex-column shadow p-4 rounded border text-center m-auto w-75 bg-white">
                        <Image src="/images/thanks-image1.webp" alt="Thanks" width="100" height="100" layout='responsive' className='w-25 m-auto'/>
                        <h1 className='w-100 fs-3 m-auto text-center'>{language.thanks_page.thanks}</h1>
                        { counter > 0 && <p>{language.thanks_page.redirect_in} {counter} {language.thanks_page.seconds}</p> }
                    </div>
                    
                </div>
            </div>
        </div>

        {/* MOUSE FLOW TAG */}
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
        }} />
        
        
    </>)

}

export default ThanksPage
import { useEffect, useState, useContext } from 'react'
import GlobalContext from '@/context/GlobalContext'
import Image from 'next/image'

import { useRouter } from 'next/router'

const path_endpoint = process.env.NEXT_PUBLIC_PATH_END_POINT
const convertions_gtag = process.env.NEXT_PUBLIC_CONVERTIONS_GTAG

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

    const extension = localStorage.getItem('extencion')

    const timer = () => {
        const time = window.setInterval(() => {
            setCounter((prevCounter) => {
                if (prevCounter === 0) {
                    // Redirigiendo a la pagina de resultados
                    window.location.replace(`${extension}/results`)
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
                window.location.replace(extension)
                return false
            } 

            return res

        })
        .then( res => {
            
            if( !res ) {
                window.location.replace(extension)
                return false
            }

            // Cargando script de converciones en la cavecera
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.innerHTML = convertions_gtag
            document.head.appendChild( script )

            timer()

            return true

        })
        .catch( error => {
            console.log( error )
            window.location.replace(extension)
        })
        .finally( () => {
            InvalidateToken( payment_id )
        })

        

    }, [])

    return (<>
        
        <div className="container-fluid h-100 wow fadeInUp " >
            <div className="row m-auto d-flex flex-column px-5 px-sm-2 justify-content-center align-items-center vh-100 py-5 w-75 " >
                <div className="col-md-12">

                    <div className="d-flex flex-column shadow p-4 rounded border text-center m-auto w-75 bg-white">
                        <Image src="/images/thanks-image1.webp" alt="Thanks" width="100" height="100" layout='responsive' className='w-25 m-auto'/>
                        <h1 className='w-75 m-auto text-center'>{language.thanks_page.thanks}</h1>
                        { counter > 0 && <p>{language.thanks_page.redirect_in} {counter} {language.thanks_page.seconds}</p> }
                    </div>
                    
                </div>
            </div>
        </div>
        
        
    </>)

}

export default ThanksPage
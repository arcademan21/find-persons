import { useEffect, useState, useContext } from 'react'
import GlobalContext from '@/context/GlobalContext'
import Image from 'next/image'
import VantaGlobe from '@/components/VantaGlobe'
import {useRouter} from 'next/router'

const path_endpoint = process.env.NEXT_PUBLIC_PATH_END_POINT
const convertions_gtag = process.env.NEXT_PUBLIC_CONVERTIONS_GTAG

const ExistsPayment = async ( payment_id ) => {
    
    try{

        // Fetch to endpoint for get payment
        const req = await fetch( path_endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "petition" : {
                    "name": "exists_payment",
                    "data": {
                        "payment": {
                            "payment_id": payment_id
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

const CreateNewUser = async ( user, country ) => {
  
    try{
        
        // Fetch to endpoint for get payment
        const req = await fetch( path_endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "petition" : {
                    "name": "create_new_user",
                    "data": {
                        "create_new_user": {
                            "user_name": user.displayName ? user.displayName : user.email,
                            "user_email": user.email,
                            "password": user.uid,
                            "role": "suscriber",
                            "status": "active",
                            "country": country,
                            "ip": ""
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

const UpdateSuscription = async ( user, suscription ) => {

    try{

        // Fetch to endpoint for update suscription
        const req = await fetch( path_endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "petition" : {
                    "name": "update_suscription",
                    "data": {
                        "update_suscription": {
                            "user_email": user.email,
                            "payment_id": suscription.payment_id,
                            "status": "trial",
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
    const router = useRouter()
    const extension = localStorage.getItem('extencion')
    
    const user = JSON.parse(localStorage.getItem('user'))
    const language = JSON.parse(localStorage.getItem('language_file'))
    
    const { payment_id } = router.query
    const [ counter, setCounter ] = useState( 5 )
    const tefpay_token = localStorage.getItem('tefpay_token')
    
    const validatePayment = async () => {
        let res = await ExistsPayment( payment_id )
        return res
    }

    const timer = () => {
        const time = window.setInterval(() => {
                
            if( counter === 0 ) {
                
                // Redirigiendo a la pagina de resultados
                // window.location.replace(`${extension}/results`)
                clearInterval( time )

            }
                
            let temp = counter-1
            setCounter( temp )

        }, 1000 )
    }

    useEffect(()=>{
        
        const country = localStorage.getItem('language')
        
        validatePayment().then(res => {
            
            if( !res ) {
                window.location.replace(extension)
                return false
            }
            
            
            CreateNewUser( user, country ).then( res => {
                if( !res ) {
                    window.location.replace(extension)
                    return false
                }
    
                UpdateSuscription( user, { payment_id: payment_id } )
                .then( res => {
                    
                    if( !res ) {
                        window.location.replace(extension)
                        return false
                    }
    
                })
    
            })
    
        })

    }, [])

    useEffect(() => {

        // Cargando script de converciones en la cavecera
        const script = document.createElement('script');
        script.type = 'text/javascript'
        script.innerHTML = convertions_gtag 
        document.head.appendChild( script )

    }, [])

    useEffect(() => {
        timer()
    }, [counter])

    if( !tefpay_token ) {
        window.location.replace(extension)
        return false
    }

    return (<>
        
        <div className="container-fluid h-100 wow fadeInUp " id="vanta-anime">
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
        <VantaGlobe el="#vanta-anime" />
        
    </>)

}

export default ThanksPage


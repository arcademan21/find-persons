import { useEffect, useState, useContext, useLayoutEffect } from 'react'
import GlobalContext from '@/context/GlobalContext'
import Image from 'next/image'
import {useRouter} from 'next/router'

const path_endpoint = process.env.NEXT_PUBLIC_PATH_END_POINT
const convertions_gtag = process.env.NEXT_PUBLIC_CONVERTIONS_GTAG

const CheckTokenValidity = async ( token ) => {
    
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

const InvalidateToken = async ( token ) => {
    
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


const CreateNewUser = async ( user ) => {

    const country = localStorage.getItem('language')
  
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

    const user = JSON.parse(localStorage.getItem('user'))
    const language = JSON.parse(localStorage.getItem('language_file'))
    
    const router = useRouter()
    const { payment_id } = router.query
    const extension = localStorage.getItem('extencion')

    const [ counter, setCounter ] = useState( 5 )

    const validatePayment = async () => {
        let res = await ExistsPayment( payment_id.split('-')[0] )
        return res
    }

    const timer = () => {
        const time = window.setInterval(() => {
            setCounter((prevCounter) => {
                if (prevCounter === 0) {
                    // Redirigiendo a la pagina de resultados
                    window.location.replace(`${extension}/results`)
                    clearInterval(time)
                    return prevCounter
                } else {
                    return prevCounter - 1
                }
            })
        }, 1000)
    }

    useLayoutEffect(() => {

        const referrer = document.referrer
        if (!referrer.includes(process.env.NEXT_PUBLIC_TEFPAY_REFFERER_URL)) {
            InvalidateToken(payment_id)
            window.location.replace(extension)
        }
        
        let result = false
        CheckTokenValidity(payment_id)
            .then(res => {
                result = res
                if (!res) {
                    throw new Error('invalid_token')
                }
                return validatePayment()
            })
            .then(res => {
                result = res
                if (!res) {
                    throw new Error('invalid_payment_id')
                }
                return CreateNewUser(user)
            })
            .then(res => {
                result = res
                if (!res) {
                    throw new Error('create_user_error')
                }
                return UpdateSuscription(user, { payment_id: payment_id })
            })
            .then(res => {
                result = res
                if (!res) {
                    throw new Error('update_suscription_error')
                }
            })
            .catch( error => {
                InvalidateToken(payment_id)
                window.location.replace(`${extension}/tefpay_error/${error.message}`)
                return false
            })
            .finally(() => {
                
                // Invalidando token
                InvalidateToken(payment_id)

                if ( !result ) {
                    window.location.replace(`${extension}/tefpay_error/error`)
                    return false
                }
    
                // Cargando script de converciones en la cavecera
                const script = document.createElement('script')
                script.type = 'text/javascript'
                script.innerHTML = convertions_gtag
                document.head.appendChild(script)

                timer()

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
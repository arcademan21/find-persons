'use client'
import { useEffect, useState } from "react"
import { toast } from 'react-toastify'

const Profile = () => {

    const [userData, setUserData] = useState( null )
    const path_endpoint = process.env.NEXT_PUBLIC_PATH_END_POINT
    const language = JSON.parse(localStorage.getItem('language_file')).profile
    const laguage_toast = JSON.parse(localStorage.getItem('language_file')).toast

    const getUserData = async ( email ) => {

        try {
            
            const req = await fetch( path_endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "petition" : {
                        "name": "get_user_data",
                        "data": {
                            "get_user_data": {
                                "user_email": email
                            }
                        }
                    }
                })
            })

            const res = await req.json()
            if( res.status === 'error' ) return false
            
            return res

        }
        catch ( error ) {
            return false
        }
    }

    const downSuscription = async ( email, payment_id ) => {

        if( confirm('¿Estas seguro de que deseas darte de baja?') === false ) return false

        try {

            const req = await fetch( path_endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "petition" : {
                        "name": "down_suscription",
                        "data": {
                            "down_suscription": {
                                "user_email": email,
                                "payment_id": payment_id,
                                "reason": "user request"
                            }
                        }
                    }
                })
            })

            const res = await req.json()
            if( res.status === 'error' ) return false
            return true

        }
        catch ( error ) {
            return false
        }

    }

    const TefpayToatsMessage = async ( type, message ) => {
        if( type === 'error' ) {
            toast.error(message)
            return 0
        }

        toast.success(message)
        return 1
    }

   
    useEffect(() => {
        
        const user = JSON.parse(localStorage.getItem('user'))
        if( !user ) {
            window.location.replace('/')
        }

        getUserData( user.email ).then( res => { 
            
            setUserData( res )

        })

        

    }, [userData])

    return ( <>

        <div className="profile-container">
            <div className="container py-5 vh-100">
                <div className="row py-5 justify-content-center">
                    
                    {/* USER INFO */}
                    <div className="col-md-6">

                        { userData && !userData.user_data ?
                            <div className="alert alert-danger">
                                { language.no_suscripted_message }
                                <a href={"/payment"}>  
                                    { language.suscribe }
                                </a>
                            </div>
                            :
                            <>
                            <h2>
                                { language.my_account_title }
                            </h2>
                            <div className="card profile-data mb-3 p-3">
                                <p className="mb-1">
                                    <strong>
                                        { language.name } :
                                    </strong> 
                                    { userData && userData.user_data.user_name }
                                </p>
                                <p className="mb-1">
                                    <strong> 
                                    { language.email }
                                    : </strong> 
                                    { userData && userData.user_data.user_email }
                                </p>
                            </div>

                            <h2>
                                { language.suscription_title }
                            </h2>
                            <div className="card profile-data mb-3 p-3">
                                <p className="mb-1">
                                    <strong> 
                                    { language.status }
                                    : </strong> 
                                    { userData && userData.suscription_data.status }
                                </p>
                                <p className="mb-1">
                                    <strong>
                                        { language.end_trial}
                                    : </strong> 
                                    { userData && userData.suscription_data.end_trial }
                                </p>

                                { userData && userData.suscription_data.status !== 'canceled' || userData.suscription_data.status !== 'down' ?
                                    <>
                                        <p>
                                            { language.paragraph_1 }{ process.env.NEXT_PUBLIC_CONTACT_EMAIL }{ language.paragraph_1b}
                                        </p>
                                        <button className="btn btn-secondary"
                                            onClick={ async ()=>{
                                                const res = await downSuscription( userData.user_data.user_email, userData.suscription_data.payment_id )
                                                if( !res ) {
                                                    TefpayToatsMessage( 'error', laguage_toast.error_down_suscription_message )
                                                }
                                                else {
                                                    
                                                    
                                                    TefpayToatsMessage( 'success', laguage_toast.success_down_suscription_message ).then( () => {
                                                        window.location.replace( '/' )
                                                    })

                                                }
                                            } }
                                        >  
                                            { language.down_suscription}
                                        </button>
                                    </>
                                    :
                                    null

                                }

                            </div>
                            </>

                        }

                    </div>

                </div>
            </div>
        </div>

    </>)

}

export default Profile
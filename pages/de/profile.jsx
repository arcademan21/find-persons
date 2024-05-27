'use client'
import { useEffect, useState } from "react"
import 'react-toastify/dist/ReactToastify.css'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

const Profile = () => {

    const [userData, setUserData] = useState( null )
    const path_endpoint = process.env.NEXT_PUBLIC_PATH_END_POINT
    const language = JSON.parse(localStorage.getItem('language_file')).profile
    const laguage_toast = JSON.parse(localStorage.getItem('language_file')).toast
    const [loading, setLoading] = useState( false )
    const user = JSON.parse(localStorage.getItem('user'))
    const extension = localStorage.getItem('extencion')

    let timestamp = Number(user.createdAt)
    let date = new Date(timestamp)
    
    const router = useRouter()

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

        // Show loading
        setLoading( true )

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
            setLoading( false )
            return true

        }
        catch ( error ) {
            return false
        }

    }

    const TefpayToatsMessage = async ( type, message ) => {
        
        if( type === 'error' ) {
            toast.error( message )
            return 0
        }

        toast.success( message )
        return 1

    }

   
    useEffect(() => {
        
        
        if( !user ) {
            router.push(extension)
        }

        getUserData( user.email ).then( res => { 
            
            setUserData( res )
            console.log( res )

        })

    }, [])

    return ( <>

        <div className="profile-container">
            <div className="container py-5 vh-100">
                <div className="row py-5 justify-content-center">
                    
                    <div className="col-md-6">

                        { userData && !userData.user_data ?
                            (<>
                            <h2>
                                { language.my_account_title }
                            </h2>
                            <div className="card profile-data mb-3 p-3">
                                
                                { user.displayName ? 
                                    <p className="mb-1">
                                        <strong>
                                            { language.name } :
                                        </strong> 
                                        { user.displayName }
                                    </p>
                                    : null
                                }
                                
                                <p className="mb-1">
                                    <strong> 
                                    { language.email }
                                    : </strong> 
                                    { user.email }
                                </p>
    
                                <p className="mb-1">
                                    <strong>
                                        { language.created_at }
                                    : </strong> 
                                    { date.toString() }
                                </p>

                            </div>
                            </>)
                            :
                            <>
                            
                            <h2>
                                { language.my_account_title }
                            </h2>
                            <div className="card profile-data mb-3 p-3">
                                
                                { user.displayName ? 
                                    <p className="mb-1">
                                        <strong>
                                            { language.name } :
                                        </strong> 
                                        { user.displayName }
                                    </p>
                                    : null
                                }
                                
                                <p className="mb-1">
                                    <strong> 
                                    { language.email }
                                    : </strong> 
                                    { user.email }
                                </p>
    
                                <p className="mb-1">
                                    <strong>
                                        { language.created_at }
                                    : </strong> 
                                    { date.toString() }
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
                                    { userData && userData.suscription_data.data && userData.suscription_data.data.status !== 'canceled' ?  
                                    <b className="text-success mx-2 p-2 border rounded"> { language.active } </b>
                                    : <b className="text-danger mx-2 p-2 border rounded"> { language.inactive } </b> }    
                                </p>

                                <p className="mb-1">
                                    <strong>
                                        { language.created_at }
                                    : </strong> 
                                    { userData && userData.suscription_data.data && userData.suscription_data.data.created_at }
                                </p>

                                <p className="mb-1">
                                    <strong>
                                        { language.end_trial}
                                    : </strong> 
                                    { userData && userData.suscription_data.data && userData.suscription_data.data.end_trial }
                                </p>

                                { userData && userData.suscription_data.data && userData.suscription_data.data.status === 'canceled' ? 
                                    <p className="mb-1">
                                        <strong>
                                            { language.canceled_at}
                                        : </strong> 
                                        { userData && userData.suscription_data.canceled_date && userData.suscription_data.canceled_date }
                                    </p>
                                : null }

                                { userData && userData.suscription_data.data && userData.suscription_data.data.status !== 'canceled' && userData.suscription_data.data.status !== 'down' ?
                                    <>
                                        <p>
                                            { language.paragraph_1 }{ process.env.NEXT_PUBLIC_CONTACT_EMAIL }{ language.paragraph_1b}
                                        </p>
                                        <button className="btn btn-secondary"
                                            onClick={ async ()=>{
                                                const res = await downSuscription( userData.user_data.user_email, userData.suscription_data.data.payment_id )
                                                if( !res ) {
                                                    TefpayToatsMessage( 'error', laguage_toast.error_down_suscription_message )
                                                }
                                                else {
                                                    
                                                    
                                                    TefpayToatsMessage( 'success', laguage_toast.success_down_suscription_message ).then( () => {
                                                        window.location.reload()
                                                    })

                                                }
                                            } }
                                        >  
                                            { loading ? <div className="spinner-border text-primary mx-2" role="status"></div> : null }
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
'use client'
import { useEffect, useState } from "react"
import 'react-toastify/dist/ReactToastify.css'
import { toast } from 'react-toastify'

const Profile = () => {

    const [userData, setUserData] = useState( null )
    const path_endpoint = process.env.NEXT_PUBLIC_PATH_END_POINT
    const language = JSON.parse(localStorage.getItem('language_file')).profile
    const laguage_toast = JSON.parse(localStorage.getItem('language_file')).toast
    const [loading, setLoading] = useState( false )
    const user = JSON.parse(localStorage.getItem('user'))

    let timestamp = Number(user.createdAt)
    let date = new Date(timestamp)

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
            window.location.replace('/')
        }

        getUserData( user.email ).then( res => { 
            
            setUserData( res )
            console.log( res )

        })

        

    }, [])

    /*
        {
        "uid": "VpUVCiMmTDUdZRBKrhKODKST16v2",
        "email": "hharoldypruebas@gmail.com",
        "emailVerified": true,
        "displayName": "Haroldy Pruebas",
        "isAnonymous": false,
        "photoURL": "https://lh3.googleusercontent.com/a/ACg8ocJcgediP5COU3kGujxkRZ8aK2j-KGHbs2-_0FbaFpM2R008aF0=s96-c",
        "providerData": [
            {
                "providerId": "google.com",
                "uid": "103367125587591675946",
                "displayName": "Haroldy Pruebas",
                "email": "hharoldypruebas@gmail.com",
                "phoneNumber": null,
                "photoURL": "https://lh3.googleusercontent.com/a/ACg8ocJcgediP5COU3kGujxkRZ8aK2j-KGHbs2-_0FbaFpM2R008aF0=s96-c"
            }
        ],
        "stsTokenManager": {
            "refreshToken": "AMf-vBytCoSo_kgWR9LXWcsDrafJSN0x3FNIsrxynSihA2knXjzn9PdqLBhqHk1B9A5xGvNQSnK9Y6u53SY-mDAGCrz82p6b4ldH8cd9iWb93WnnmxzqmGJfBe3Y1KPMfhuk-Ba4ZY_jgYr4ZbVN7cDxhDO1RdK6kUqr6IRrap9MGTCqLA-mpusP730M2btWW4McqUvAS2weFCdm7zubzjuiRPmkupARYBz8s1J6cswJsSbxc7rds60wskbyYYTqzqUAVtJ-XjhgW2wSPmIKbDoA98K9Dc-lEvtzuZkBLoFFp_zXFEFzdvuY-VZ9K2z2tlxJ4-QsgIETnuOaHviQXxkcrN87xdY1wUh93nAakWJ-ffxuY3uRXBT39K3myG1I-dqC-CHGKjd9HOzbi8mMfg8mIdpNQlfVhiBbIfjQ7Usb2-nPsFF8iuBO7cuNrvga8ohOXE5TqAL1",
            "accessToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6Ijc2MDI3MTI2ODJkZjk5Y2ZiODkxYWEwMzdkNzNiY2M2YTM5NzAwODQiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiSGFyb2xkeSBQcnVlYmFzIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0pjZ2VkaVA1Q09VM2tHdWp4a1JaOGFLMmotS0dIYnMyLV8wRmJhRnBNMlIwMDhhRjA9czk2LWMiLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vZmluZC1wZXJzb25zLThhMGMwIiwiYXVkIjoiZmluZC1wZXJzb25zLThhMGMwIiwiYXV0aF90aW1lIjoxNzE1MTYwNzUyLCJ1c2VyX2lkIjoiVnBVVkNpTW1URFVkWlJCS3JoS09ES1NUMTZ2MiIsInN1YiI6IlZwVVZDaU1tVERVZFpSQktyaEtPREtTVDE2djIiLCJpYXQiOjE3MTUxNjA3NTIsImV4cCI6MTcxNTE2NDM1MiwiZW1haWwiOiJoaGFyb2xkeXBydWViYXNAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZ29vZ2xlLmNvbSI6WyIxMDMzNjcxMjU1ODc1OTE2NzU5NDYiXSwiZW1haWwiOlsiaGhhcm9sZHlwcnVlYmFzQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6Imdvb2dsZS5jb20ifX0.g4dbZgyIbSxfPI-g49dpPMzhCDPZrWW4-7938yw3-jokLLGnT83T_do87tCjyjIogRC2fFOAwmIzxif1jnytPdx1Wg4WLiKx46mYofUgz_uITX1EVzCr_9acammdGFqV6qOkQqhzoRo-Rv1ZcPYdJCFd98xinRd1Viaw1D9FBsV7MAgRiBShFmboj6llmPiwPppqbD046On05vMBegl8k7dvFiqM0xKhg_Xl2v4rTrh7g4VJsPFKRW11GXJRz7xWP0U88xWRm622Nc_UeIA8jeqEcuyw9HS28YJR-tctGoEOHrmpmuwCoAvpkH_pAYDJygDgyEbliTzOA-heylEVkw",
            "expirationTime": 1715164352249
        },
        "createdAt": "1715160751928",
        "lastLoginAt": "1715160751929",
        "apiKey": "AIzaSyCyk37Ey6buyE_a7zLwrLggvcg0Z-VAVhE",
        "appName": "[DEFAULT]"
    }
        */



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
                                    { userData && userData.suscription_data && userData.suscription_data.status !== 'canceled' ?  
                                    <b className="text-success mx-2 p-2 border rounded"> { language.active } </b>
                                    : <b className="text-danger mx-2 p-2 border rounded"> { language.inactive } </b> }    
                                </p>

                                <p className="mb-1">
                                    <strong>
                                        { language.end_trial}
                                    : </strong> 
                                    { userData && userData.suscription_data && userData.suscription_data.end_trial }
                                </p>

                                { userData && userData.suscription_data && userData.suscription_data.status !== 'canceled' && userData.suscription_data.status !== 'down' ?
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
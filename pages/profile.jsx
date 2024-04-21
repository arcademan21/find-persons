

/* 
    {
        "status": "success",
        "message": "User data found",
        "user_data": {
            "id": "30",
            "user_name": "find-persons find-persons",
            "user_email": "info.findpersons@gmail.com",
            "password": "IAAPxGefnbdQjjMlhue5vj5M9Um2",
            "status": "active",
            "country": "es",
            "role": "suscriber",
            "created_at": "2024-04-21 20:21:57",
            "searchs": null,
            "downloads": null,
            "ip": "81.35.117.26"
        },
        "suscription_data": {
            "id": "29",
            "user_id": "30",
            "payment_id": "202404211821270830000-fe730721bf3e4c8bef7863d8fe4e6082bcb5b5f8",
            "created_at": "2024-04-21 20:21:58",
            "user_name": "find-persons find-persons",
            "user_email": "info.findpersons@gmail.com",
            "status": "trial",
            "end_trial": "2024-04-22 20:21:58",
            "country": "es",
            "canceled_date": null,
            "reason": null
        }
    }
*/


     
import { useEffect, useState } from "react"



const Profile = () => {

    const [userData, setUserData] = useState( null )
    const [loading, setLoading] = useState( true )
    const path_endpoint = process.env.NEXT_PUBLIC_PATH_END_POINT

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

    const downSuscription = async ( email ) => {

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
                                "user_email": email
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

    useEffect(() => {
        
        const user = JSON.parse(localStorage.getItem('user'))
        if( !user ) {
            window.location.replace('/')
        }

        getUserData( user.email ).then( res => { 
            if( !res ) {
                window.location.replace('/')
                return false
            }

            setUserData( res )
            setLoading( false )
        })

    }, [])

    if( loading ) return <div className="loading"><i className="fas fa-spinner fa-spin"></i></div>

    return (

        <div className="profile-container">
            <div className="container">
                <div className="row" style={{ marginTop: '50px' }}>
                    
                    <div className="col-md-6">
                        
                        <h2>Mi cuenta</h2>
                        <div className="profile-data">
                            <p><strong>Nombre:</strong> { userData ? userData.user_data.user_name : <i className="fas fa-spinner fa-spin"></i> }</p>
                            <p><strong>Correo:</strong> { userData ? userData.user_data.user_email : <i className="fas fa-spinner fa-spin"></i> }</p>
                        </div>

                        <h2>Suscription</h2>
                        <div className="profile-data">
                            <p>
                                <strong>Estado de la suscripcion : </strong> 
                                { userData ? userData.suscription_data.status : 
                                <i className="fas fa-spinner fa-spin"></i> }
                            </p>
                            <p>
                                <strong>Fin de prueba : </strong> 
                                { userData ? userData.suscription_data.end_trial : 
                                <i className="fas fa-spinner fa-spin"></i> }
                            </p>

                            { 
                                userData.suscription_data.status !== 'canceled' ?
                                <>
                                <p>
                                    Recuerda que si no deseas continuar con la suscripcion, puedes darte de baja en cualquier momento.
                                    Si tienes alguna duda, puedes contactar con nosotros en {process.env.NEXT_PUBLIC_CONTACT_EMAIL}, envianos un correo y te responderemos lo antes posible.
                                </p>
                                <button className="btn btn-secondary"
                                    onClick={ async ()=>{
                                        const res = await downSuscription( userData.user_data.user_email )
                                        if( !res ) toast.error('Error al darse de baja, por favor pongase en contacto con nosotros.')
                                        else {
                                            toast.success('Se ha dado de baja correctamente')
                                            window.location.replace('/')
                                        }
                                    } }
                                >
                                    Darse de baja
                                </button>
                                </>
                                :
                                null

                            }

                        </div>

                    </div>

                </div>
            </div>
        </div>


    )




}

export default Profile
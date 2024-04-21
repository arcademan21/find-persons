import { useEffect, useState } from "react"

const GetUserData = async ( email ) => {

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

const Profile = () => {

    const [userData, setUserData] = useState( null )

   

   

    useEffect(() => {
        
        const user = JSON.parse(localStorage.getItem('user'))
        if( !user ) {
            window.location.replace('/')
        }

        GetUserData( user.email ).then( res => { 
            if( !res ) window.location.replace('/')
            setUserData( res )
            console.log(res)
        })
        
    }, [])

    return (
        <div className="profile-container">
            <div className="container">
                <div className="row" style={{ marginTop: '50px' }}>
                    
                    {/* <div className="col-12">
                        
                        <div className="card">
                            <div className="card-header">
                                <h2>Personal Information</h2>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-6">
                                        <h3>Name</h3>
                                        <p>{ userData ? userData.name : 'Loading...' }</p>
                                    </div>
                                    <div className="col-6">
                                        <h3>Email</h3>
                                        <p>{ userData ? userData.email : 'Loading...' }</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card">
                            <div className="card-header">
                                <h2>Suscripcion</h2>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-6">
                                        <h3>Estado</h3>
                                        <p>{ userData ? userData.subscription_status : 'Loading...' }</p>
                                    </div>
                                    <div className="col-6">
                                        <h3>Fecha de inicio</h3>
                                        <p>{ userData ? userData.subscription_start_date : 'Loading...' }</p>
                                        <p>
                                            Recuerda que puedes contactar a soporte para cancelar tu suscripcion.
                                            Envianos un correo a { process.env.NEXT_PUBLIC_SUPPORT_EMAIL } si tienes 
                                            algun problema , o dirigite a la seccion de soporte en la pagina principal.
                                            <a href="/#contact">
                                                Formulario de contacto con soporte
                                            </a>
                                        </p>
                                        <button 
                                            className="btn btn-secondary"
                                            onClick={ handleSuscriptionDown }
                                        >Dar de baja</button>
                                    </div>
                                    
                                </div>
                            </div>

                        </div>

                    </div> */}

                </div>
            </div>
        </div>

    )




}

export default Profile
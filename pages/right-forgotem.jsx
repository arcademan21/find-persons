'use client'
import Head from 'next/head';
import { toast } from 'react-toastify';

const SendForGotemForm = async () => {

    const user = JSON.parse( localStorage.getItem('user') )

    if ( !user ) {
        toast.error('Debes iniciar sesion para enviar el formulario')
        return false
    }

    try {
        const req = await fetch( process.env.NEXT_PUBLIC_PATH_END_POINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "petition" : {
                    "name": "create_right_to_beforgotten",
                    "data": {
                        "create_right_to_beforgotten": {
                            "user_email": user.email,
                            "name": document.getElementById('name').value,
                            "email": document.getElementById('email').value,
                            "phone": document.getElementById('phone').value,
                            "forgotem_name": document.getElementById('forgotem-name').value,
                            "forgotem_email": document.getElementById('forgotem-email').value,
                            "forgotem_phone": document.getElementById('forgotem-phone').value,
                            "forgotem_address": document.getElementById('forgotem-address').value
                        }
                    }
                }
            })
        })

        const res = await req.json()
        if( res.status === 'error' ) return false
        return res

    } catch ( error ) {
        return false
    }

}

const RightForGotem = () => {

    return (<>

        <Head>
            <meta name="robots" content="noindex" />
        </Head>

        <div className="container py-5">
            
            <div className="page-banner my-5">
                <div className="row justify-content-center align-items-center h-100">
                    <div className="col-md-6">
                    <h1 className="text-center">Formulario de derecho al olvido</h1>
                    </div>
                </div>
            </div>

            <main>

                <div className="page-section">
                    <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-12 py-3">
                        
                        <h2 className="title-section">Rellene el formulario a continuacion</h2>
                        <div className="divider"></div>


                        <form onSubmit={()=>{
                            SendForGotemForm().then((res)=>{
                                if( !res ) toast.error('Error al enviar el formulario')
                                else toast.success('Formulario enviado correctamente')
                            })
                        }} method="post" className="form">
                            
                            <div className="form-group">
                                <label htmlFor="name">Nombre</label>
                                <input type="text" name="name" id="name" className="form-control" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="email" name="email" id="email" className="form-control" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone">Telefono</label>
                                <input type="text" name="phone" id="ohone" className="form-control" required />
                            </div>

                            <div className='divider w-75'></div>

                            <h3>Informacion a eliminar</h3>
                            <div className="form-group">
                                <label htmlFor="name">Nombre</label>
                                <input type="text" name="forgotem-name" id="forgotem-name" className="form-control" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="email" name="forgotem-email" id="forgotem-email" className="form-control" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone">Telefono</label>
                                <input type="text" name="forgotem-phone" id="forgotem-phone" className="form-control" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="address">Direccion</label>
                                <input type="text" name="forgotem-address" id="forgotem-address" className="form-control" required />
                            </div>

                            <button type="submit" className="btn btn-primary">Enviar</button>
                        </form>

                        <p>
                            <small>
                            <strong>Nota:</strong> Al enviar este formulario, usted acepta que sus datos personales sean procesados por nosotros.
                            </small>
                        </p>
                        </div>
                    </div>
                    </div>
                </div>

                        


            </main>


        </div>
    </>)

}

export default RightForGotem
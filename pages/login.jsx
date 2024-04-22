'use client'
import {useState, useEffect, useContext} from 'react'
import { signInWithEmailAndPassword } from "firebase/auth"
import { toast } from 'react-toastify'
import GlobalContext from '@/context/GlobalContext'
import VantaGlobe from '@/components/VantaGlobe'
import 'react-toastify/dist/ReactToastify.css'
import Image from 'next/image'
import Link from 'next/link'

const Login = ( ) => {

    const context = useContext( GlobalContext )
    const { state, setState } = context
    const { auth } = state
    
    const [ error, setError ] = useState( null )
    const [ success, setSuccess ] = useState( null )
    const [ language, setLanguage ] = useState( JSON.parse( localStorage.getItem('language_file') ).login )
    const search = localStorage.getItem('search').toString()
    const user = JSON.parse( localStorage.getItem('user') )
    
    const loginUser = async () => {
        
        const email = document.getElementById('email').value
        const password = document.getElementById('password').value
        const loadingButton = document.getElementById('btn-login')
        const terms = document.getElementById('register-terms')
        

        loadingButton.setAttribute('disabled', 'true')
        loadingButton.innerHTML = `
            <i className="fas fa-spinner fa-spin fs-2 mx-2 fs-5 mx-1">
            </i>Porfavor espere...
        `
        if( !terms.checked ) {
            toast.error( 'Debes aceptar los terminos y condiciones del servicio.' )
            setError(true)
            loadingButton.removeAttribute('disabled')
            loadingButton.innerHTML = `
                Iniciar sesión
                <i className="fas fa-sign-in-alt fs-2 mx-2 fs-5 mx-1"></i>
            `

            return false
        }

        // Iniciando sesión con un usuario de firebase.
        signInWithEmailAndPassword( auth, email, password )
        .then(( userCredential ) => {
            // Signed in
            setSuccess(true)
            setState({ ...state, user: userCredential.user })
            localStorage.setItem('user', JSON.stringify(userCredential.user))

            const showSuccesToast = async () => {
                toast.success('Inicio de sesión exitoso.')
            }

            showSuccesToast().then(() => {
                window.location.replace('/')
            })

        }).catch((error) => {
            
            // Validadndo errors de autenticacion de firebase            
            if ( error.code === 'auth/invalid-login-credentials') {
                toast.error( 'El usuario no existe o la contraseña es incorrecta.' )
                setError(true)
            }

            if ( error.code === 'auth/too-many-requests') {
                toast.error(`Demasiados intentos de inicio de sesión.
                Debes esperar 20 minutos para volver a intentar.`)
                setError(true)
            }

            loadingButton.removeAttribute('disabled')
            loadingButton.innerHTML = `
                Iniciar sesión
                <i className="fas fa-sign-in-alt fs-2 mx-2 fs-5 mx-1"></i>
            `

        })

    }

    useEffect(() => {
        if( user ) window.location.replace('/')
    }, [])

    useEffect(() => {
        setLanguage( JSON.parse( localStorage.getItem('language_file') ).login )
    }, [ state ])

    return (<>
        <div className="container-fluid h-100 wow fadeInUp" id="vanta-anime">
            <div className="row m-auto d-flex flex-column px-5 px-sm-2 justify-content-center align-items-center vh-100 py-5 w-75">

                <div className="d-flex shadow p-0 rounded2x">
                <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1 px-3 login-col">
                    <div className="d-none w-75 m-auto logo-register-form">
                    <Link
                        href="/"
                        className="navbar-brand link-logo 
                            text-center"
                    >
                        <Image
                        src="/images/logo_find-persons.png"
                        alt="Find Persons"
                        width={50}
                        height={50}
                        />
                    </Link>
                    </div>

                    <h1 className="title-section text-center d-flex flex-column h1 fw-bold mx-1 mx-md-4 my-5 mb-4">
                    <span>{language.title} <span className="marked">{language.session}</span></span>
                    <span className="marked fs-6 m-auto">{language.subtitle}</span>
                    </h1>
                    

                    <div className="mx-1 mx-md-4 px-4 register-form" >
                    

                    <div className="d-flex flex-row align-items-center mb-2">
                        <div className="form-outline flex-fill mb-0">

                        <div className="input-icon">
                            <i className="fas fa-envelope"></i>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="form-control my-1"
                                placeholder={language.email_placeholder}
                            />
                        </div>
                        <small className="text-muted p-1 ">
                            {language.example_email}
                        </small>

                        </div>
                    </div>

                    <div className="d-flex flex-row align-items-center mb-4">
                        <div className="form-outline flex-fill mb-0">
                        
                        <div className="input-icon">
                            <i className="fa fa-lock"></i>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className="form-control my-1"
                                placeholder={language.password_placeholder}
                            />
                        </div>
                            
                        <small className="text-muted p-1">
                            {language.password_min}  
                        </small>
        
                        </div>
                    </div>

                    <div className="form-check d-flex justify-content-center mb-4">
                        <input
                        className="form-check-input me-2"
                        type="checkbox"
                        value=""
                        id="register-terms"
                        />
                        <label
                        className="form-check-label"
                        htmlFor="register-terms"
                        >
                        {language.accept_the}
                        <Link href="/terms"> {language.terms_and_conditions}</Link>
                        {language.of_service}
                        </label>
                    </div>

                    <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-2">
                        <button className="btn btn-primary btn-lg" id='btn-login' onClick={loginUser}>
                            {language.init_session}
                            <i className="fas fa-sign-in-alt fs-4 mx-2 fs-5 mx-1"></i>
                        </button>
                    </div>

                    <div className="d-flex justify-content-center">
                        <p className="title-section text-center w-100">
                        <span className="marked">{language.no_account}</span>
                        <br />
                        <span className="link-primary my-1" onClick={()=>{window.location.replace('/register')}} >
                            <i className="fas fa-user-plus fa-2x mx-1"></i>
                            <span className='fs-4'>{language.register_link}</span>
                        </span>
                        </p>
                    </div>
                    </div>

                </div>

                <div className="col-md-10 col-lg-6 col-xl-7 d-flex order-1 order-lg-2 col-register">
                    <div className="d-flex flex-column m-auto">
                    <div className="d-flex flex-column" id="image-register">
                        <Image
                            src="/images/bg_image_2.png"
                            className="img-fluid w-75 m-auto"
                            width={100}
                            height={100}
                            layout="responsive"
                            alt="Registrate gratis"
                        />

                        <div className="d-flex flex-column py-5">
                        
                            <p className="px-5 text-center text-light fs-5">
                                {language.login_info}
                            </p>

                        

                        </div>
                    </div>
                    </div>
                </div>
                </div>

            </div>
        </div>
        <VantaGlobe el="#vanta-anime" />
    </>)

}



export default Login
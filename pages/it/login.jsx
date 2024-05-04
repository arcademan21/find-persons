'use client'
import {useState, useEffect, useContext} from 'react'
import { signInWithEmailAndPassword } from "firebase/auth"
import { toast } from 'react-toastify'
import GlobalContext from '@/context/GlobalContext'
import 'react-toastify/dist/ReactToastify.css'
import Image from 'next/image'
import { FaUserPlus, FaEnvelope, FaLock, FaSignInAlt } from 'react-icons/fa'
import Link from 'next/link'
import '../css/login.css'

const Login = ( ) => {

    const context = useContext( GlobalContext )
    const { state, setState } = context
    const { auth } = state
    
    const [ language, setLanguage ] = useState( JSON.parse( localStorage.getItem('language_file') ).login )
    const search = localStorage.getItem('search')
    const user = JSON.parse( localStorage.getItem('user') )

    const language_toats = JSON.parse( localStorage.getItem('language_file') ).toast

    const extension = localStorage.getItem('extencion')
    
    const loginUser = async () => {
        
        const email = document.getElementById('email').value
        const password = document.getElementById('password').value
        const loadingButton = document.getElementById('btn-login')
        const loadingButtonHtml = loadingButton.innerHTML 
        
        loadingButton.setAttribute('disabled', 'true')
        loadingButton.innerHTML = language.please_weait

        signInWithEmailAndPassword( auth, email, password )
        .then(( userCredential ) => {
            
            // Signed in
            setSuccess(true)
            setState({ ...state, user: userCredential.user })
            localStorage.setItem('user', JSON.stringify(userCredential.user))

            toast.success( language_toats.succes_session_init_message )
            window.location.replace(extension)

        }).catch((error) => {

            const showErrorToast = async (error) => {
                toast.error( error )
                setError(true)
            }
                      
            if ( error.code === 'auth/invalid-login-credentials') {
                showErrorToast( language.error )
                setError(true)
            }

            if ( error.code === 'auth/too-many-requests') {
                showErrorToast( language_toats.error_mush_session_message )
                setError(true)
            }

        }).finally(() => {
            loadingButton.removeAttribute('disabled')
            loadingButton.innerHTML = language.init_session
        })

    }

    useEffect(() => {
        if( user ) window.location.replace(extension)
    }, [])

    useEffect(() => {
        setLanguage( JSON.parse( localStorage.getItem('language_file') ).login )
    }, [ state ])

    return (<>
        <div className="container-fluid h-100 wow fadeInUp">
            <div className="row m-auto d-flex flex-column px-5 px-sm-2 justify-content-center align-items-center vh-100 py-5 w-75 content-login-form">

                <div className="d-flex shadow p-0 rounded2x">
                <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1 px-3 login-col">
                    <div className="d-none w-75 m-auto logo-register-form">
                    <Link
                        href={extension}
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
                            <FaEnvelope />
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
                            <FaLock />
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

                    <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-2">
                        <button className="btn btn-primary btn-lg" id='btn-login' onClick={loginUser}>
                            {language.init_session}
                            <FaSignInAlt className='fs-4 mx-2 fs-5 mx-1' />
                        </button>
                    </div>

                    <div className="d-flex justify-content-center">
                        <p className="title-section text-center w-100">
                        <span className="marked">{language.no_account}</span>
                        <br />
                        <span className="d-flex link-primary my-1 w-100 justify-content-center align-items-center" onClick={()=>{window.location.replace(`${extension}/register`)}} >
                            <FaUserPlus className='mx-1' style={{ fontSize: "3rem", marginRight: "5px" }} />
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
    </>)

}



export default Login
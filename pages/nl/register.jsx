'use client'
import { useEffect, useState, useContext } from 'react'
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { toast } from 'react-toastify'
import { FaUserPlus, FaEnvelope, FaLock, FaSignInAlt, FaGoogle, FaUser } from 'react-icons/fa'
import GlobalContext from '@/context/GlobalContext'
import Image from 'next/image'
import Link from 'next/link'
import 'react-toastify/dist/ReactToastify.css'
import '../css/register.css'
import { useRouter } from 'next/navigation'


const path_endpoint = process.env.NEXT_PUBLIC_PATH_END_POINT
const GetSuscription = async ( user ) =>{
    
    try{

        // Fetch to endpoint for update suscription
        const req = await fetch( path_endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "petition" : {
                    "name": "get_suscription",
                    "data": {
                        "get_suscription": {
                            "user_email": user.email,
                        }
                    }
                }
            })
        })

        const res = await req.json()
        if( res.data.status === 'canceled' ) return false
        if(res.status === 'error') return false

        return res

    } catch ( error ) {
        return false
    }

}

const SendWellcomeEmail = async ( user, country ) => {

    try{

        // Fetch to endpoint for send email
        const req = await fetch( path_endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "petition" : {
                    "name": "send_wellcome_email",
                    "data": {
                        "send_wellcome_email": {
                            "user_email": user.email,
                            "country": country,
                            "user_name": user.displayName ? user.displayName : user.email
                        }
                    }
                }
            })
        })

        const res = await req.json()
        if(res.status === 'error') return false

        return res

    } catch ( error ) {
        return false
    }

}

const Register = () => {
    
    const context = useContext( GlobalContext )
    const { state, setState } = context
    const { auth } = state
    const user = JSON.parse( localStorage.getItem('user') )
    const search = localStorage.getItem('search')
    const [ language, setLanguage ] = useState( JSON.parse( localStorage.getItem('language_file') ).register )
    const language_toast = JSON.parse( localStorage.getItem('language_file') ).toast
    const [loadingRegisterButton, setLoadingRegisterButton] = useState( false )
    const lang = localStorage.getItem('language')
    const extension = localStorage.getItem('extencion')
    const router = useRouter()
    
    const newUser = async () => { 
        
        const user_name = document.getElementById('user_name').value
        const email = document.getElementById('email').value
        const password = document.getElementById('password').value
        const loadingButton = document.getElementById('btn-register')
        const loadingButtonHtml = loadingButton.innerHTML
        const terms = document.getElementById('register-terms')

        loadingButton.setAttribute('disabled', 'true')
        setLoadingRegisterButton(true)

        if( !terms.checked ) {
            loadingButton.removeAttribute('disabled')
            setLoadingRegisterButton(false)
            toast.error( language_toast.error_acept_terms_message )
            return false
        }

        if(  user_name === ''  ){
            loadingButton.removeAttribute('disabled')
            setLoadingRegisterButton(false)
            toast.error( language_toast.error_register_empty_message )
            return false
        }

        localStorage.setItem('user_name', user_name)

        
        createUserWithEmailAndPassword( auth, email, password )
        .then( ( UserCredential ) => { 
            
            // depurando..
            debugger
            loadingButton.innerHTML = language.suscces_register
            
            setState({ ...state, user: UserCredential.user })

            const showSuccesToast = async () => {
                toast.success( language_toast.success_register_message )
            }

            SendWellcomeEmail( UserCredential.user, lang )
            showSuccesToast().then(() => {
                
                GetSuscription( user ).then( suscripted => {
            
                    if( !suscripted && search === 'null' ) window.location.replace(extension)
                    else if( !suscripted && search !== 'null' ) window.location.replace(`${extension}/payment`)
                    else if( suscripted && search !== 'null' ) window.location.replace(`${extension}/results`)
        
                })

            })

        })
        .catch( ( error ) => { 
            
            loadingButton.removeAttribute('disabled')
            setLoadingRegisterButton(false)

            if( error.code === 'auth/email-already-in-use' ) {
                toast.error( language_toast.error_register_email_message )
                setError(true)
            }

            else if( error.code === 'auth/invalid-email' ) {
                toast.error( language_toast.error_register_email_no_valid_message )
                setError(true)
            }

            else if( error.code === 'auth/weak-password' ) {
                toast.error( language_toast.error_register_password_message )
                setError(true)
            }

           

        })
    
    }

    const newUserGoogle = async () => {

        const terms = document.getElementById('register-terms')
        if( !terms.checked ) {
            
            toast.error( language.error_acept_terms_message )
            return false
        }
        
        // Registrando un usuario con google
        signInWithPopup( auth, new GoogleAuthProvider() ).then(( result ) => {
           
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult( result )
            const token = credential.accessToken
            
            // The signed-in user info.
            const user = result.user
            setState({ ...state, user: user })

            const showSuccesToast = async () => {
                toast.success( language_toast.success_google_session_message )
            }

            SendWellcomeEmail( user, lang)
            showSuccesToast().then(() => {
                localStorage.setItem('user_name', user_name)
                GetSuscription( user ).then( suscripted => {
            
                    if( !suscripted && search === 'null' ) router.push(extension)
                    else if( !suscripted && search !== 'null' ) window.location.href = `${extension}/payment`
                    else if( suscripted && search === 'null' ) router.push(extension)
                    else if( suscripted && search !== 'null' ) router.push(`${extension}/results`)
                    
        
                })

            })
            
            // Todo: save user data
        
        }).catch(( error ) => {
            
            // Handle Errors here.
            const errorCode = error.code
            const errorMessage = error.message
            
            // The email of the user's account used.
            const email = error.email
            
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error)

            // Todo: validate error and save error data
            if( errorCode === 'auth/account-exists-with-different-credential' ) 
                toast.error( language_toast.error_google_session_message )
            // more validations
            
        })

        
        

    }

    useEffect(() => {
        GetSuscription( user ).then( suscripted => {
            
            if( user && !suscripted ) window.location.href = `${extension}/payment`
            else if( user && suscripted && search !== 'null' ) router.push(`${extension}/results`)

        })
    }, [])

    useEffect(() => {
        setLanguage( JSON.parse( localStorage.getItem('language_file') ).register )
    }, [state])

    return (<>
        
        <div className="container-fluid h-100 wow fadeInUp">
                <div className="row m-auto d-flex flex-column px-5 px-sm-2 justify-content-center align-items-center vh-100 py-5 w-75 content-register-form">
                    
                    <div className="col-sm-12 d-flex shadow p-0 rounded2x w-100">
                        
                        <div className='d-flex w-100'>

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
                                    width={150}
                                    height={60}
                                    />
                                </Link>
                                </div>

                                <h1 className="title-section text-center d-flex flex-column h1 fw-bold mx-1 mx-md-4 my-5 mb-4">
                                <span>
                                    { language.title }  
                                    <span className="marked"> {language.free} </span>
                                </span>
                                <span className="marked fs-6 m-auto">{language.subtitle}</span>
                                </h1>

                                

                                <div className="mx-1 mx-md-4 px-4 register-form">

                                    
                                    <div className="d-flex flex-row align-items-center mb-2">
                                        <div className="form-outline flex-fill mb-0">
                                        
                                        <div className="input-icon">
                                            <FaUser />
                                            <input
                                                type="text"
                                                id="user_name"
                                                name="user_name"
                                                className="form-control my-1"
                                                placeholder={ language.placeholder_user_name}
                                                required={true}
                                            />
                                        </div>
                                            
                                        <small className="text-muted p-1">
                                            { language.min_user_name}
                                        </small>

                                        </div>
                                    </div>
                                    
                                    
                                    
                                    <div className="d-flex flex-row align-items-center mb-2">
                                        <div className="form-outline flex-fill mb-0">

                                        <div className="input-icon">
                                            <FaEnvelope />
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                className="form-control my-1"
                                                placeholder={ language.placeholder_email}
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
                                            placeholder={ language.placeholder_password}
                                        />
                                    </div>
                                        
                                    <small className="text-muted p-1">
                                        { language.min_password}
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
                                    {language.acept_politics}
                                    <Link href={`${extension}/policies`}> {language.policies} </Link>
                                    {language.of_service}
                                    
                                    </label>
                                </div>

                                <div className="d-flex flex-column align-items-center justify-content-center mx-4 mb-3 mb-lg-2">

                                    {loadingRegisterButton ?
                                        <div className="spinner-border text-primary" role="status">
                                            <span className="visually-hidden">{language.please_weait}</span>
                                        </div>
                                        : <button className="btn btn-primary btn-lg mb-2 fs-6 w-75" id="btn-register"  onClick={newUser}>
                                            <FaUserPlus className='fs-5 mx-2' />
                                            <span>{language.register_free}</span>
                                        </button>
                                    }

                                    <button className="btn btn-danger btn-lg mb-2 fs-6 w-75" id="btn-google" onClick={newUserGoogle}>
                                        <FaGoogle className='fs-5 mx-2' />
                                        <span>{language.register_google}</span>
                                    </button>

                                </div>

                                <div className="d-flex justify-content-center">
                                    <p className="title-section text-center w-100">
                                    <span className="marked">{language.have_account}</span>
                                    <br />
                                    <span href="/login" className="link-primary my-1" onClick={()=>{
                                        router.push(`${extension}/login`)
                                    }}>
                                      
                                        {language.login} <FaSignInAlt className='fs-5 mx-2' />
                                    
                                        
                                    </span>
                                    </p>
                                </div>
                                </div>


                            </div>

                            <div className="col-md-10 col-lg-6 col-xl-7 d-flex order-1 order-lg-2 col-register">
                                <div className="d-flex flex-column justify-content-center w-100">
                                    <div className="d-flex flex-column" id="image-register">
                                        <Image
                                        src="/images/bg_image_1.png"
                                        className="img-fluid w-75 h-75 px-5 m-auto"
                                        width={500}
                                        height={500}
                                        alt="Registrate gratis"
                                        />

                                        <div className="d-flex flex-column py-2">
                                            

                                            { search !== 'null' ?
                                                
                                                <div className="d-flex px-4 py-3">
                                                    <div className="d-flex flex-column w-25 bg-light rounded shadow border">
                                                        <Image src="/images/no_user_image.jpeg" alt="results" className='w-100 p-1 h-100 rounded' width={100} height={100}/>
                                                    </div>
                                                    <div className="d-flex w-75 bg-light mx-2 rounded border shadow">
                                                        <p className="p-4 text-secondary title-section">
                                                            <b className='marked fs-5'>{ search }</b> <br />
                                                            <b className='marked'>{language.we_founded} </b> {language.we_have_report} <b className='marked'>{language.complete_report}</b> {language.of_profile}
                                                            <br />
                                                            <b className='marked'> {language.register_to_see}</b>
                                                            <br />
                                                            
                                                        </p>
                                                    </div>
                                                </div>

                                                : 

                                                <div className="d-flex px-4 py-3">
                                                    <div className="d-flex flex-column w-25 bg-light rounded shadow border">
                                                        <Image src="/images/result_file.jpeg" alt="results" className='w-100 p-1 h-100 rounded' width={100} height={100}/>
                                                    </div>
                                                    <div className="d-flex w-75 bg-light mx-2 rounded border shadow">
                                                        <p className="p-4 fs-6 text-secondary">
                                                            {language.register_no_user_holder}
                                                        </p>
                                                    </div>
                                                </div>


                                            }

                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>


                </div>

        </div>
    </>)
    
}

export default Register

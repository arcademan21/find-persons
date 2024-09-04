'use client'
import FirebaseConfig from '../configs/FirebaseConfig'
import { initializeApp } from "firebase/app"
import { getAnalytics, isSupported } from "firebase/analytics"
import { getFirestore } from 'firebase/firestore/lite'
import { getAuth } from "firebase/auth"
import { usePathname } from 'next/navigation'
import { createContext, useState, useEffect, useCallback } from 'react'
import CookieConsent from "react-cookie-consent"
import { TbCookie } from "react-icons/tb"

const GlobalContext = createContext()

export const GlobalProvider = ( { children } ) => {
  
  const pathname = usePathname()
  const [ state, setState ] = useState( {
    menu: { active_links: true },
    language:  null,
    language_file: null,
    auth: null,
    user: null, 
    search: null,
    search_type: null
  } )
  const [extension, setExtension] = useState( '' )

  const SettingExtencion = useCallback( async () => {
    
    localStorage.setItem('menu', JSON.stringify( { menu: { active_links: true } } ) )
    
    const extension_list = [
      'es', 'it', 'fr', 'uk', 'de', 'ae', 'ie', 'nl'
    ]

    const blocked_url_names = [
      'thanks'
    ]

    if( pathname === '/' ) {
      localStorage.setItem('extencion', pathname)
    }

    else{
      if( extension_list.includes( pathname.split('/')[1] ) ) {
        localStorage.setItem('extencion', `/${pathname.split('/')[1]}`)
      }
    }

    if( blocked_url_names.includes( pathname ) ) {
      setState(prevState => ({ ...prevState, menu: { active_links: false } }))
      localStorage.setItem('menu', JSON.stringify( { menu: { active_links: false } } ) )
    }


  }, [ pathname ])

  const SettingLanguage = useCallback( async () => {

      let extension = 'es'
      const language = localStorage.getItem('language')
      
      if( pathname !== '/' ) {
          extension = localStorage.getItem('extencion').split('/')[1]
      }

      if( extension !== language && language !== null ) {
          extension = language
      }

      if( language === null && pathname !== '/' ) {
          extension = localStorage.getItem('extencion').split('/')[1]
      }

      const req = await fetch(`/languajes/${extension}.json`)
      const res = await req.json()
      localStorage.setItem('language', res.language)
      localStorage.setItem('language_file', JSON.stringify(res))
      setState(prevState => ({ ...prevState, language: res.language, language_file: res }))
      if( extension !== 'es' ) setExtension(extension)
      return res

  }, [ pathname ])

  const SettinUser = useCallback( async () => {

    // Recuperando el usuario del localStorage 
    const storedUser = localStorage.getItem('user')
    
    if ( storedUser ) 
      setState(prevState => ({ ...prevState, user: JSON.parse( storedUser ) }))

    else {
        setState(prevState => ({ ...prevState, user: null }))
        localStorage.setItem( 'user', null )  
    } 
    
  }, [])

  const SettingSearch = useCallback( async () => {
    
    const storedSearch = localStorage.getItem('search')
    const storedSearchType = localStorage.getItem('search_type')  
    
    if ( storedSearch ) 
        setState(prevState => ({ ...prevState, search: storedSearch.toString() }))
    else {
        setState(prevState => ({ ...prevState, search: null }))
        localStorage.setItem( 'search', null )
    }

    if ( storedSearchType ) 
        setState(prevState => ({ ...prevState, search_type: storedSearchType.toString() }))
    else {
        setState(prevState => ({ ...prevState, search_type: 'name' }))
        localStorage.setItem( 'search_type', 'name' )
    }

  }, [])

  const SettingFirebase = useCallback( async () => {

    // Inicializar Firebase Auth y Firestore de manera asíncrona
    const firebase = initializeApp( FirebaseConfig )
    const auth = getAuth( firebase )

    // Todo: usar base de datos firestore
    //const database = getFirestore( firebase )

    // Inicializar Firebase Analytics de manera síncrona
    if ( isSupported() ) {
      // Todo: Usar analitics de firestore
      //const analytics = getAnalytics( firebase )
      
    }

    // Observador de autenticación de Firebase
    const unsubscribe = auth.onAuthStateChanged(currentUser => {
      
      if ( currentUser ) localStorage.setItem('user', JSON.stringify( currentUser ))
      else localStorage.removeItem( 'user' )
      
      setState(prevState => ({ ...prevState, user: currentUser, auth }))

    })

    // Limpiar el observador cuando el componente se desmonte
    return () => unsubscribe()

  }, [])

  useEffect(() => {

    SettingExtencion()
    SettingLanguage()
    SettinUser()
    SettingSearch()
    SettingFirebase()

  }, [ SettingLanguage, SettinUser, SettingFirebase, SettingSearch ] )

  if( !state.language ) return null

  let cookieConsentStyle = {
    background: "rgb(255, 255, 255)",
    color: "#645f88",
    textAlign: "center",
    boxShadow: "0px -2px 0px #e9e8f5",
    minHeight: "8rem"
  }
  
  return (
    
    <GlobalContext.Provider value={{ state, setState }} >
      
      {/* <CookieConsent
          location="bottom"
          buttonText={state.language_file.cookies_banner.acept}
          cookieName="myAwesomeCookieName2"
          style={cookieConsentStyle}
          buttonClasses="btn bg-primary w-25 text-white py-1 fs-4 rounded"
          buttonWrapperClasses="w-100 text-center"
          expires={150}
      >
          {state.language_file.cookies_banner.paragraph_1}
          <a href={`${extension}/cookies`} className='m-3 mx-1 border rounded bg-light p-1 py-2'>
            <TbCookie className='fs-1 mx-1'/>
            {state.language_file.cookies_banner.cookies}
          </a>
          {state.language_file.cookies_banner.paragraph_2}
          <br />
          {state.language_file.cookies_banner.paragraph_3}
      </CookieConsent> */}
      { children }
    </GlobalContext.Provider>
  )

}

export default GlobalContext
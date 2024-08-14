'use client'
import {useState, useEffect, useContext} from 'react'
import GlobalContext from '../context/GlobalContext'
import {DefaultLanguage, SetDefaultLanguageOnLocalStorage, SetDefaultObjectLanguageOnLocalStorage} from '../configs/LanguagesConfig'
import './css/languages-switch.css'
import $ from 'jquery'
import Image from 'next/image'

const LanguageSwitcher = () => {

        const context = useContext( GlobalContext )
        const { state, setState } = context
        //const extension = localStorage.getItem('extencion').split('/')[1]

        const [ language, setLanguage ] = useState( state.language )
        const [ loading, setLoading ] = useState( true )
        const [ languageObject, setLanguageObject ] = useState( null )
        const initialLanguage = DefaultLanguage() 

        //const menuLanguages = $('.menu-languages')
        const menuLanguages = $('.menu-languages')
        const menuLanguagesBtn = $('.menu-languages-btn')
        const closeLanguagesBtn = $('.close-languages-btn')
        const languagesItems = $('.menu-languages-item')

        const switchLanguage = async ( e, lang=null, selector=false ) => {
                //debugger
                // if( selector ) return false
                if( lang === null ) lang = e.target.getAttribute('data-language') 
                if( lang === null ) return false
                
                const req = await fetch(`/languajes/${lang}.json`)
                .then( res => res )
                .catch( err => console.error( err ) )
                const res = await req.json()

                SetDefaultLanguageOnLocalStorage( res.language )
                SetDefaultObjectLanguageOnLocalStorage( res )
                setState( state => ({ ...state, language: res.language, language_file: res }) )
                setLanguage( res.language )
                setLanguageObject( res )
                setLanguageOnClient( res )
                
                return res

        }

        const setLanguageOnClient = ( data ) => {
            
            // Seting flag image
            $('.image-holder').attr('src', `/languajes/flags/${data.language}.svg`)
            $('.image-holder').attr('alt', data.alt)
            $('.image-holder').attr('data-language', data.language)

        }

        useEffect(() => {
            
            $( menuLanguagesBtn ).on('click', () => {
                $( menuLanguages ).toggleClass('active')
            })

            $( closeLanguagesBtn ).on('click', () => {
                $( menuLanguages ).removeClass('active')
            })

            $( languagesItems ).on('click', () => {
                $('.menu-languages').removeClass('active')
            })

            return () => {
                $( menuLanguagesBtn ).off('click')
                $( closeLanguagesBtn ).off('click')
                $( languagesItems ).off('click')
            }

        }, [ languageObject ] )

        useEffect(() => {
            
            if( initialLanguage !== null ){
                setLanguage( initialLanguage )
                switchLanguage( null, initialLanguage ) 
            }

            setLoading( false ) 

        },[ initialLanguage ])

        if( loading )
            return (<div className="spinner-border text-primary" role="status"> 
            <span className="visually-hidden">Loading...</span>
        </div>)

        return (<div>
            
            <div className='menu-languages-button'>

                <button className="menu-languages-btn"  data-toggle="collapse" data-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation" >

                    <div className="menu-languages-item-holder">
                        <div className='d-flex flex-column align-items-center image-content'>

                            <Image 
                                className="flag image-holder rounded shadow border" 
                                onClick={ e => switchLanguage( e, null, true ) } width={50} height={39}
                                src={`/languajes/flags/${language}.svg`} alt="language"
                            />
                            

                        </div>  
                    </div>

                </button>
    
            </div>
            
            <div className="menu-languages">
                
                <div className="close-languages-btn">
                    <i className="fas fa-times"></i>
                </div>

                <div className="menu-languages-items">
                    
                    <div className="menu-languages-item border shadow rounded ">
                        <div className='d-flex flex-column align-items-center image-content' >
                            <Image src={`/languajes/flags/es.svg`} alt="Español" className="flag rounded w-100 px-1" data-language="es" onClick={ switchLanguage } width={100} height={70} />
                            Spanish
                        </div>
                    </div>

                    <div className="menu-languages-item border shadow rounded ">
                        <div className='d-flex flex-column align-items-center image-content'>
                            <Image src={`/languajes/flags/it.svg`} alt="Italiano" className="flag rounded w-100 px-1" data-language="it" onClick={ switchLanguage } width={100} height={70} />
                            Italian
                        </div>  
                    </div>

                    <div className="menu-languages-item border shadow rounded ">
                        <div className='d-flex flex-column align-items-center image-content'>
                            <Image src={`/languajes/flags/fr.svg`} alt="Frances" className="flag rounded w-100 px-1" data-language="fr" onClick={ switchLanguage } width={100} height={70} />
                            French
                        </div>
                    </div>

                    <div className="menu-languages-item border shadow rounded ">
                        <div className='d-flex flex-column align-items-center image-content'>
                            <Image src={`/languajes/flags/de.svg`} alt="Aleman" className="flag rounded w-100 px-1" data-language="de" onClick={ switchLanguage } width={100} height={70} />
                            German
                        </div>
                    </div>

                    {/* TEST - IDIOMA */}
                    {/* <div className="menu-languages-item border shadow rounded ">
                        <div className='d-flex flex-column align-items-center image-content'>
                            <Image src={`/languajes/flags/at.svg`} alt="Aleman" className="flag rounded w-100 px-1" data-language="at" onClick={ switchLanguage } width={100} height={70} />
                            Australiano
                        </div>
                    </div> */}
                    {/*  END - IDIOMA */}

                    <div className="menu-languages-item border shadow rounded ">
                        <div className='d-flex flex-column align-items-center image-content'>
                            <Image src={`/languajes/flags/us.svg`} alt="Ingles" className="flag rounded w-100 px-1" data-language="us" onClick={ switchLanguage } width={100} height={70} />
                            English
                        </div>
                    </div>

                    <div className="menu-languages-item border shadow rounded ">
                        <div className='d-flex flex-column align-items-center image-content'>
                            <Image src={`/languajes/flags/nl.svg`} alt="Holandes" className="flag rounded w-100 px-1" data-language="nl" onClick={ switchLanguage } width={100} height={70} />
                            Dutch
                        </div>
                    </div> 
                    
                </div>

            </div>

        </div>)




}

export default LanguageSwitcher


                





'use client'
import { useState, useEffect, useContext } from 'react'
import GlobalContext from '../context/GlobalContext'
import { LogOutButton } from './LogOutButton'
import GetLanguageSwitcher from './LanguageSwitcher'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FaUser, FaUserPlus, FaSignInAlt, FaEnvelope, FaArrowCircleLeft } from 'react-icons/fa'

const MenuButtons = () => {
    
    const pathname = usePathname()
    const extension = localStorage.getItem('extencion')
    const { state } = useContext( GlobalContext )

    const [language, setLanguage] = useState(JSON.parse(localStorage.getItem('language_file')))
    const [isHome, setIsHome ] = useState( null )
    const activeMenu = JSON.parse(localStorage.getItem('menu'))?.menu?.active_links
    
    const handle_contact = () => {
        
        const intervalId = setInterval(() => {
            const element = document.getElementById( 'contact' )
            if ( element ) {
                element.scrollIntoView( { behavior: 'smooth' } )
                clearInterval( intervalId )
            }
        }, 100 ) 

        return 
       
    }

    const handle_register = () => {
        if( extension !== null && extension !== '' && extension !== '/'){
          window.location.replace(`${extension}/register`)
        }
        else {
          window.location.replace('/register')
        }
    }

    const handle_login = () => {
      if( extension !== null && extension !== '' && extension !== '/'){
          window.location.replace(`${extension}/login`)
      }
      else {
          window.location.replace('/login')
      }
    }

    const handle_profile = () => {
      if( extension !== null && extension !== '' && extension !== '/'){
          window.location.replace(`${extension}/profile`)
      }
      else {
          window.location.replace('/profile')
      }
    }
  
    useEffect(() => {
        
        if(  window.location.hash === '#contact' ){
            handle_contact()
        }

        setLanguage(JSON.parse(localStorage.getItem('language_file')))

        if( extension === '/es' ) setIsHome(true)
        else if( pathname === extension ) setIsHome(true) 
        
        
    }, [state, pathname])

    return (<>
      
      {state.user ? 

        (<>
          {isHome ?
              
              (<>
                <button onClick={handle_contact} className="btn btn-outline py-2 px-3 rounded-pill decoration-none m-3 menu-contact-btn" >
                  <FaEnvelope className="fs-6 mx-1" />
                  <span data-section="nav_bar" data-value="contact">
                    {language.nav_bar.contact}
                  </span>
                </button>
      
                <button onClick={handle_profile} className="btn btn-outline title-section py-2 px-3 rounded-pill decoration-none m-3">
                  <FaUser className="fs-6 mx-1" />
                  <b className='marked'>
                    <span data-section="nav_bar" data-value="profile">
                      <b className='marked'>
                        {language.nav_bar.profile}
                      </b>         
                    </span>
                  </b>
                </button>
      
                <LogOutButton text={language.nav_bar.logout}/>
                <GetLanguageSwitcher />
                
              </>)
            


          : null }
          
        </> ) 
        
        
        
        : (

        <>
          
          { isHome ? 
            (<> 
              
              <button onClick={handle_contact} className="btn btn-outline py-2 px-3 rounded-pill decoration-none m-3 menu-contact-btn" >
                  <FaEnvelope className="fs-6 mx-1" />
                  <span data-section="nav_bar" data-value="contact">
                    {language.nav_bar.contact}
                  </span>
              </button>

              <button onClick={handle_register} className="btn title-section btn-outline py-2 px-3 rounded-pill decoration-none m-3">
                <FaUserPlus className="fs-5 mx-1" />
                <span data-section="nav_bar" data-value="register">
                    {language.nav_bar.register}
                </span>
              </button>
      
              <button onClick={handle_login} className="btn btn-outline py-2 px-3 rounded-pill decoration-none m-3">
                <FaSignInAlt className="fs-6 mx-1" />
                <span data-section="nav_bar" data-value="login">{language.nav_bar.login}</span>
              </button>

              <GetLanguageSwitcher />
              

            </>) 
            : null
            
            



          }

        </>

      )}
      
  </>)
    
}

export default MenuButtons

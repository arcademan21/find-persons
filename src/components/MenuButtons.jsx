'use client'
import { useState, useEffect, useContext } from 'react'
import GlobalContext from '../context/GlobalContext'
import { LogOutButton } from './LogOutButton'
import GetLanguageSwitcher from './LanguageSwitcher'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const MenuButtons = () => {
    
    const pathname = usePathname()
    const extension = localStorage.getItem('extencion')
    const { state } = useContext( GlobalContext )

    const [language, setLanguage] = useState(JSON.parse(localStorage.getItem('language_file')))
    const [isHome, setIsHome ] = useState( null)
    const activeMenu = JSON.parse(localStorage.getItem('menu')).menu.active_links
    
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
        window.location.replace(`${extension}/register`)
    }

    const handle_login = () => {
        window.location.replace(`${extension}/login`)
    }

    const handle_profile = () => {
        window.location.replace(`${extension}/profile`)
    }
  

    useEffect(() => {
        
        if(  window.location.hash === '#contact' ){
            handle_contact()
        }

        setLanguage(JSON.parse(localStorage.getItem('language_file')))

        if( pathname === extension ) setIsHome(true) 
        
        
    }, [state, pathname])

    return (<>
      {state.user ? (
        <>
          {!isHome ? 
              
              (<>
              { !activeMenu ? (
                <div className="d-flex">
                      
                      <button className="btn title-section btn-outline py-2 px-3 rounded-pill decoration-none mx-3" onClick={ () => router.back() }>
                          <i className="fas fa-arrow-left fs-5 mx-1"></i>
                          <span className="marked">
                            {language.nav_bar.back}
                          </span>
                      </button>
                      
                  </div> 
                  )
                : null
              }
              </>)

          : (<>
              
              <button onClick={handle_contact} className="btn btn-outline py-2 px-3 rounded-pill decoration-none mx-3">
                <i className="fas fa-envelope fs-6 mx-1"></i>
                <span data-section="nav_bar" data-value="contact">
                  {language.nav_bar.contact}
                </span>
              </button>
    
              <button onClick={handle_profile} className="btn btn-outline title-section py-2 px-3 rounded-pill decoration-none mx-3">
                <i className="fas fa-user fs-6 mx-1"></i>
                <b className='marked'>
                  <span data-section="nav_bar" data-value="profile">
                    <b class='marked'>
                      {language.nav_bar.profile}
                    </b>
                    
                  </span>
                </b>
              </button>
    
              <LogOutButton />

              <GetLanguageSwitcher />
              
            
          </>)}
        </>
      ) : (
        <>
          
          { isHome ? 
            (<> 
              <button onClick={handle_contact} className="btn btn-outline py-2 px-3 rounded-pill decoration-none mx-3">
                  <i className="fas fa-envelope fs-6 mx-1"></i>
                  <span data-section="nav_bar" data-value="contact">
                    {language.nav_bar.contact}
                  </span>
              </button>

              <button onClick={handle_register} className="btn title-section btn-outline py-2 px-3 rounded-pill decoration-none mx-3">
                <i className="fas fa-user-plus fs-6 mx-1"></i>
                <span data-section="nav_bar" data-value="register">
                    {language.nav_bar.register}
                    <b className='marked'>
                      {language.nav_bar.free}
                    </b>
                </span>
              </button>
      
              <button onClick={handle_login} className="btn btn-outline py-2 px-3 rounded-pill decoration-none mx-3">
                <i className="fas fa-sign-in-alt fs-6 mx-1"></i>
                <span data-section="nav_bar" data-value="login">{language.nav_bar.login}</span>
              </button>

              <GetLanguageSwitcher />

            </>) 
            : 
            
            (<>
            { !activeMenu ? (
              <div className="d-flex">
                    
                    <button className="btn title-section btn-outline py-2 px-3 rounded-pill decoration-none mx-3" onClick={ () => router.back() }>
                        <i className="fas fa-arrow-left fs-5 mx-1"></i>
                        <span className="marked">
                          {language.nav_bar.back}
                        </span>
                    </button>
                    
                </div> 
                )
              : null
            }
            </>)



          }

        </>

      )}
      
  </>)
    
}

export default MenuButtons

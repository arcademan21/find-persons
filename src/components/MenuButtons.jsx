'use client'
import { useState, useEffect, useContext } from 'react'
import GlobalContext from '../context/GlobalContext'
import { LogOutButton } from './LogOutButton'
import GetLanguageSwitcher from './LanguageSwitcher'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const MenuButtons = () => {
    
    const pathname = usePathname()
    
    const { state } = useContext( GlobalContext )

    const [language, setLanguage] = useState(JSON.parse(localStorage.getItem('language_file')))
    const [isHome, setIsHome ] = useState( null)
    const [isThanks, setIsThanks ] = useState( null)
    
    useEffect(() => {
        
        setLanguage(JSON.parse(localStorage.getItem('language_file')))

        if( pathname === '/' ) {
            setIsHome(true)
        }
        
        let pathArray = pathname.split('/')
        if( pathArray.includes('thanks') ) {
            setIsThanks(true)
        }
        
    }, [state, pathname])

    return (<>
      {state.user ? (
        <>
          {!isHome ? 
              
              (<>
              { !isThanks ? (
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
              
              <Link href="/#contact" className="btn btn-outline py-2 px-3 rounded-pill decoration-none mx-3">
                <i className="fas fa-envelope fs-6 mx-1"></i>
                <span data-section="nav_bar" data-value="contact">
                  {language.nav_bar.contact}
                </span>
              </Link>
    
              <Link href="/#account" className="btn btn-outline title-section py-2 px-3 rounded-pill decoration-none mx-3">
                <i className="fas fa-user fs-6 mx-1"></i>
                <b className='marked'>
                  <span data-section="nav_bar" data-value="profile">
                    <b class='marked'>
                      {language.nav_bar.profile}
                    </b>
                    
                  </span>
                </b>
              </Link>
    
              <LogOutButton />

              <GetLanguageSwitcher />
              
            
          </>)}
        </>
      ) : (
        <>
          
          { isHome ? 
            (<> 

              <Link href="/#contact" className="btn btn-outline py-2 px-3 rounded-pill decoration-none mx-3">
                  <i className="fas fa-envelope fs-6 mx-1"></i>
                  <span data-section="nav_bar" data-value="contact">
                    {language.nav_bar.contact}
                  </span>
              </Link>

              <Link href="/register" className="btn title-section btn-outline py-2 px-3 rounded-pill decoration-none mx-3">
                <i className="fas fa-user-plus fs-6 mx-1"></i>
                <span data-section="nav_bar" data-value="register">
                    {language.nav_bar.register}
                    <b className='marked'>
                      {language.nav_bar.free}
                    </b>
                </span>
              </Link>
      
              <Link href="/login" className="btn btn-outline py-2 px-3 rounded-pill decoration-none mx-3">
                <i className="fas fa-sign-in-alt fs-6 mx-1"></i>
                <span data-section="nav_bar" data-value="login">{language.nav_bar.login}</span>
              </Link>

              <GetLanguageSwitcher />

            </>) 
            : 
            
            (<>
            { !isThanks ? (
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

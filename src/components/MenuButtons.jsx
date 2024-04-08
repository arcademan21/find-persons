'use client'
import { useState, useEffect, useContext } from 'react'
import GlobalContext from '../context/GlobalContext'
import { LogOutButton } from './LogOutButton'
import GetLanguageSwitcher from './LanguageSwitcher'
import Link from 'next/link'

const MenuButtons = () => {
    
    const { state } = useContext( GlobalContext )
    const [activeLinks, setActiveLinks] = useState( null )
    
    useEffect(() => {
        setActiveLinks( state.menu.active_links )
    }, [])

    return (<>
      {state.user ? (
        <>
          {!activeLinks ? 
              null
              /* <div className="d-flex">
                  
                  <button className="btn title-section btn-outline py-2 px-3 rounded-pill decoration-none mx-3" onClick={
                      () => window.history.back()
                  }>
                      <i className="fas fa-arrow-left fs-5 mx-1"></i>
                      <span className="marked">Voler atras</span>
                  </button>
                  
              </div> */
          : (<>
              
              <Link href="/#contact" className="btn btn-outline py-2 px-3 rounded-pill decoration-none mx-3">
                <i className="fas fa-envelope fs-6 mx-1"></i>
                <span data-section="nav_bar" data-value="contact">Contacto</span>
              </Link>
    
              <Link href="/#account" className="btn btn-outline title-section py-2 px-3 rounded-pill decoration-none mx-3">
                <i className="fas fa-user fs-6 mx-1"></i>
                <b className='marked'>
                  <span data-section="nav_bar" data-value="profile">Mi cuenta</span>
                </b>
              </Link>
    
              <LogOutButton />

              <GetLanguageSwitcher />
              
            
          </>)}
        </>
      ) : (
        <>
          
          { activeLinks ? 
            (<> 

              <Link href="/#contact" className="btn btn-outline py-2 px-3 rounded-pill decoration-none mx-3">
                  <i className="fas fa-envelope fs-6 mx-1"></i>
                  <span data-section="nav_bar" data-value="contact">Contacto</span>
              </Link>

              <Link href="/register" className="btn title-section btn-outline py-2 px-3 rounded-pill decoration-none mx-3">
              <i className="fas fa-user-plus fs-6 mx-1"></i>
              <span data-section="nav_bar" data-value="register">
                  Registrarse <b className='marked'>Gratis</b>
              </span>
              </Link>
      
              <Link href="/login" className="btn btn-outline py-2 px-3 rounded-pill decoration-none mx-3">
              <i className="fas fa-sign-in-alt fs-6 mx-1"></i>
              <span data-section="nav_bar" data-value="login">Iniciar sesión</span>
              </Link>

              <GetLanguageSwitcher />

            </>) 
            : null

          }

        </>

      )}
      
  </>)
    
}

export default MenuButtons

'use client'
import MenuButtons from "./MenuButtons"
import ResponsiveMenu from "./ResponsiveMenu"
import LanguageSwitcher from "./LanguageSwitcher"
import { useEffect, useState } from "react"
import "./css/header.css"
import Image from "next/image"
import { usePathname } from "next/navigation"

const Header = () => {

  const pathname = usePathname()
  const extension = localStorage.getItem('extencion')
  const [isHome, setIsHome ] = useState( null )

  useEffect(() => {
      if( extension === '/es' ) setIsHome(true)
      else if( pathname === extension ) setIsHome(true) 
  }) 

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light navbar-float p-0">
        <div className="d-flex w-100 justify-content-between px-2">
          <div className="d-flex content-link-logo">
            {pathname !== 'payment' ?
              <a href={extension} className="navbar-brand link-logo ">
                <Image src="/images/logo_find-persons.png" width={150} height={60} alt="logo" />
              </a>
            : <span className="navbar-brand link-logo ">
                <Image src="/images/logo_find-persons.png" width={150} height={60} alt="logo" />
              </span> }
          </div>

          <div
            className="navbar-collapse collapse justify-content-end"
            id="navbarContent"
          >
            <div className="d-flex justify-content-end w-75 ">
              <MenuButtons />
            </div>
          </div>

          {isHome ? 
              <div className="d-flex justify-content-end d-lg-none d-xl-none h-75 my-2 align-self-center menu-buttons-content">
                <LanguageSwitcher />
                <ResponsiveMenu />
              </div>
          : null }

        </div>
      </nav>
    </header>
  )
}

export default Header

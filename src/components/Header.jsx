import MenuButtons from "./MenuButtons"
import ResponsiveMenu from "./ResponsiveMenu"
import LanguageSwitcher from "./LanguageSwitcher"
import "./css/header.css"
import Image from "next/image"

const Header = () => {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light navbar-float p-0">
        <div className="d-flex w-100 justify-content-between px-5">
          <div className="d-flex w-25 content-link-logo">
            <a href="/" className="navbar-brand link-logo ">
              <Image src="/images/logo_find-persons.png" width={150} height={60} alt="logo" />
            </a>
          </div>

          <div
            className="navbar-collapse collapse justify-content-end"
            id="navbarContent"
          >
            <div className="d-flex justify-content-end w-75">
              <MenuButtons />
            </div>
          </div>

          <div className="d-flex justify-content-end d-lg-none d-xl-none h-75 my-2 align-self-center">
            <LanguageSwitcher />
            <ResponsiveMenu />
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header

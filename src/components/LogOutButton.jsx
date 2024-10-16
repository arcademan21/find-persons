'use client'
import { useContext, useState } from "react"
import GlobalContext from "../context/GlobalContext"
import { signOut } from "firebase/auth"
import { FaSignOutAlt } from 'react-icons/fa'

// Cerrar sesión con un botón
export const LogOutButton = ({text}) => {

    const context = useContext( GlobalContext )
    const { state, setState } = context
    const auth = state.auth
    const [language, setLanguage] = useState(JSON.parse(localStorage.getItem('language_file')))
    const extension = localStorage.getItem('extencion') 
    
    const logOut = async () => {
        
        await signOut(auth)
        .then(() => {
            // Sign-out successful.
            setState({ ...state, user: null })
            localStorage.removeItem('user')
            window.location.replace(extension)
        })
        .catch((error) => {
            // An error happened.
            setState({ ...state, user: null, error: error, errorMessage: error.message, errorCode: error.code })
            localStorage.removeItem('user')
            window.location.replace(extension)

        })

    }
    
    return (<>

        <button className="btn btn-outline py-2 px-3 rounded-pill m-3" onClick={logOut}>
            <span data-section="nav_bar" data-value="logout">
                {text}
            </span>
            <FaSignOutAlt className="fs-6 mx-1" />
        </button>

    </>)

}

export default LogOutButton
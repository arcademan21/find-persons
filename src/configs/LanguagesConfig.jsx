import { useState, useEffect } from 'react'



export const DefaultLanguage = () => {

    const clientLanguaje = navigator.language.split('-')[0]
    
    const [ defaultLanguage, setDefaultLanguage ] = useState( clientLanguaje )

    const SetDefaultLanguageOnLocalStorage = ( language ) => {
        window.localStorage.setItem( 'language', language )
    }

    useEffect(() => {
        
        const local_language = window.localStorage.getItem('language')
        if( local_language !== null ){
            setDefaultLanguage( local_language )
            SetDefaultLanguageOnLocalStorage( local_language )
        }

        else{
            SetDefaultLanguageOnLocalStorage( defaultLanguage )
        }
        
    }, [ defaultLanguage ] )

    return defaultLanguage

}

export const SetDefaultLanguageOnLocalStorage = ( language ) => {  
    window.localStorage.setItem('language', language)
}

export const SetDefaultObjectLanguageOnLocalStorage = ( data ) => {
    window.localStorage.setItem('language_file', JSON.stringify(data))
}
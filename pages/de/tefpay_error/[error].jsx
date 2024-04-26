import { useState, useEffect } from "react"
import { useRouter } from "next/router"

const TefpayError = () => {

    const [language, setLanguage] = useState(JSON.parse(localStorage.getItem('language_file')).tefpay_error)
    const [counter, setCounter] = useState(5)
    
    const router = useRouter()
    const { tefpay_error } = router.query
    const extension = localStorage.getItem('extencion')

    useEffect(() => {
        setLanguage(JSON.parse(localStorage.getItem('language_file')).tefpay_error)
    }, [])

    useEffect(() => {
        
        const time = window.setInterval(() => {
            if( counter === 0 ) {
                window.location.replace(`${extension}/payment`)
                clearInterval( time )
            }
            let temp = counter-1
            setCounter( temp )
        }, 1000 )
    }, [counter])

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h1 className="text-center">{language.title}</h1>
                    <p className="text-center">{language.text}</p>
                    <p className="text-center">{language.error}</p>
                    <pre className="text-center">
                        {tefpay_error}
                    </pre>
                    <span className="text-center">{language.please_weait} {counter} </span>
                </div>
            </div>
        </div>
    )
}

export default TefpayError


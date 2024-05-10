'use client'
import { useEffect, useState, useContext  } from "react"
import GlobalContext from '../context/GlobalContext'
import Image from 'next/image'
import AllRight from './AllRight'

const Footer = () => {

    const context = useContext(GlobalContext)
    const { state } = context
    let extension = localStorage.getItem('extencion')

    if( extension !== '/' ){
        extension = `${extension}/`
    }

    const [language, setLanguage] = useState(JSON.parse(localStorage.getItem('language_file')).footer)
        
    useEffect(() => {
        setLanguage(JSON.parse(localStorage.getItem('language_file')).footer)
    }, [state])

    return (<>
        
        <footer className="page-footer">
            
            <div className="container">
                
                <div className="row align-content-center justify-content-center mb-5 flex-column" data-section="footer" data-value="html">
                
                    <div className="col-lg-4 py-3 d-flex flex-column align-content-center  align-items-center justify-content-center align-self-center">
                    
                        <div className="w-50 ">
                            <Image src="/images/logo_find-persons.png" alt="logo" width={200} height={70} />
                        </div>
                        <p> 
                            {language.searcher_profecional}
                        </p>

                    </div>
                    <div className="col-md-8 col-lg-8 py-3 my-4">
                        
                        <h5 className="text-center"> {language.importat_links}
                        </h5>
                        <ul className="footer-menu d-flex justify-content-center">
                            <li>
                            <a href={`${extension}policies`}>
                                {language.privacy_policies} 
                            </a>
                            </li>
                            <li>
                            <a href={`${extension}cookies`}>
                                {language.cookies_policies}
                            </a>
                            </li>
                            <li>
                            <a href={`${extension}terms`}>
                                {language.terms_and_conditions}  
                            </a> 
                            </li>
                            <li>
                            <a href={`${extension}legal`}>
                                {language.legal_loan}
                            </a> </li>
                            <li><a href={`${extension}right-forgotem`}>
                                {language.right_forgotem}
                            </a>  </li> 
                        </ul>
                    
                    </div>
                    
                    <div className="col-lg-3 py-3"></div>

                </div>

                <div className="row justify-content-center">
                    
                    <div className="col-sm-6 py-2">
                        <center>
                            <p id="copyright">
                                <AllRight/>
                            </p>
                        </center>
                    </div>
                    
                </div>
            </div> 

            

            


        </footer> 


        

    </>)
    
}

export default Footer
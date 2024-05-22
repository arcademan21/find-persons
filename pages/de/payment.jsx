'use client'
import {useEffect, useContext, useState} from "react"
import TefpayPaymentForm from "@/components/TefpayPaymentForm"
import GlobalContext from "@/context/GlobalContext"
import Image from "next/image"
import { FaClock, FaEnvelope, FaLock } from "react-icons/fa"
import { FaCircleCheck } from "react-icons/fa6"
import ModalTerms from "@/components/ModalTerms"

const path_endpoint = process.env.NEXT_PUBLIC_PATH_END_POINT
const GetSuscription = async ( user ) =>{
    try{

        // Fetch to endpoint for update suscription
        const req = await fetch( path_endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "petition" : {
                    "name": "get_suscription",
                    "data": {
                        "get_suscription": {
                            "user_email": user.email,
                        }
                    }
                }
            })
        })

        const res = await req.json()
        if( res.data.status === 'canceled' ) return false
        if(res.status === 'error') return false

        return res

    } catch ( error ) {
        return false
    }

}

const Payment = () => {
    
    const context = useContext( GlobalContext )
    const { state } = context

    const user = JSON.parse(localStorage.getItem('user'))
    const search = localStorage.getItem('search')
    const [ language, setLanguage ] = useState( JSON.parse( localStorage.getItem('language_file') ).payment )
    const extension = localStorage.getItem('extencion')
    
    useEffect(() => {
        
        setLanguage( JSON.parse( localStorage.getItem('language_file') ).payment )
        GetSuscription( user ).then( suscripted => {
            
            if( !user ) window.location.replace(`${extension}/register`)
            else if( user && suscripted ) window.location.replace(`${extension}/results`)

        })
    }, [])

    return (<>
        <ModalTerms/>
        <div className="payment-container" >
            <div className="container">
                <div className="row mb-5 shadow p-0 rounded2x">
                    
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 p-2 info-payment">
                        
                        <div className="d-flex px-3 flex-column">
                            <h2 className="text-center text-secondary title-section mt-4">{language.title}</h2>
                            <p className="text-center text-secondary mb-0 ">
                                {language.sub_title}
                            </p>
                        </div>
                        <div className="info-service d-flex flex-column p-4">
                            <div className="d-flex content-result-image shadow rounded m-auto justify-content-center">
                                <Image 
                                    src="/images/result_file.jpeg" 
                                    alt="results-holder" 
                                    className="img-fluid rounded" 
                                    width={100} 
                                    height={100} 
                                    layout="responsive"
                                    />
                            </div>
                            <div className="d-flex flex-column p-3 m-auto w-100">
                                <h3 className="text-center text-secondary title-section mb-4">
                                    {language.service_title}<br/>
                                    <span className="marked">{search}</span>
                                </h3>
                                <div className="text-secondary my-3">
                                    
                                    <div className="fs-6 mb-1">
                                        <FaCircleCheck className="fs-4 text-primary mx-2" />
                                        {language.service_description1}
                                    </div><br />
                                    <div className="fs-6 mb-1">
                                        <FaCircleCheck className="fs-4 text-primary mx-2" />
                                        {language.service_description2}
                                    </div><br />
                                    <div className="fs-6 mb-1">
                                        <FaCircleCheck className="fs-4 text-primary mx-2" />
                                        {language.service_description3}
                                    </div><br />
                                    <div className="fs-6 mb-1">
                                        <FaCircleCheck className="fs-4 text-primary mx-2" />
                                        {language.service_description4}
                                    </div>

                                </div>

                                <div className="d-flex justify-content-center">
                                    <Image src="/images/bg_image_3.png" alt="secure-payment" className="img-fluid w-50" width={100} height={100} layout="responsive"/>
                                </div>

                            </div>

                        </div>
                        
                    </div>
                    
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 p-2 wrap-payment-form">
                        
                        <div className="content-payment-form p-4">
                            
                            
                            <div className="form-info text-center p-2 bg-light my-2 shadow rounded">
                                <h3 className="title-section text-secondary">
                                    {language.total_to_pay} 
                                    <span className="marked fs-1">
                                        {language.total_price}
                                    </span>
                                </h3>
                                <p className="title-section text-secondary">
                                    <span className="marked fs-5 fs-ms-6">
                                        <FaClock className="fs-1" />
                                        {language.time_access}
                                    </span> 
                                </p>
                                
                            </div>

                            { user ? 
                                <TefpayPaymentForm  />
                            : null }
                            
                        </div>

                        <div className="form-info text-center bg-light rounded shadow p-5">
                                    
                            <div className="secure-icons">
                                
                                <div className="d-flex secure-icons-images mb-5">
                                    
                                    <div className="d-flex w-25 justify-content-start">
                                        <Image src="/tefpay_resources/img/07V99000544/security.png" alt="security" className="img-fluid " width={100} height={100} layout="responsive" />
                                    </div>

                                    <div className="d-flex w-25 justify-content-end">
                                        <Image src="/tefpay_resources/img/07V99000544/tefpay-logo1.png" alt="verified by visa" className="img-fluid mx-3" width={100} height={100} layout="responsive" />
                                    </div>
                                
                                    <div className="d-flex w-25 justify-content-end">
                                        <Image src="/tefpay_resources/img/07V99000544/ssl.png" alt="ssl" className="img-fluid mx-3" width={100} height={100} layout="responsive" />
                                    </div>

                                </div>

                                {/* <h2 className="my-3 title-section">
                                    <span className="marked">
                                        {language.secure_payment}
                                    </span>
                                </h2>
                                <p className="text-secondary title-section m-auto">
                                    <FaLock className="fa-2x text-primary" style={{fontSize: '2rem'}} />
                                    <br/>
                                    {language.secure_payment_description}
                                    <br/>
                                    {language.domain_name}
                                </p> */}
                                
                                
                                
                            </div>

                            <div className="contact-info-panel d-flex justify-content-center">
                                <div className="d-flex flex-column p-5">
                                    <p className="text-secondary text-center title-section">
                                        {language.contact_info}
                                        <span className="marked fs-5">
                                            {language.contact_info_hours}
                                        </span> <br /> 
                                        <span className="marked fs-5">
                                            {language.contact_info_email}
                                        </span>.
                                    </p>
                                    <div className="d-flex justify-content-center">
                                        <button className="btn btn-primary btn-lg decoration-none" onClick={
                                            () => window.location.replace(`${extension}/#contact`)   
                                        }>
                                            <FaEnvelope className="fs-4" />
                                            <b className="fs-4"> 
                                                {language.btn_contact}
                                            </b>
                                        </button>
                                    </div>
                                </div>
                                        
                            </div>

                            
                        </div>

                        
                    </div>
                    
                </div>


                
            </div>

        </div>
    
    </>)

}

export default Payment

'use client'
import { useEffect, useState, useContext, useRef } from 'react'
import GlobalContext from '../context/GlobalContext'
import './css/home-sections.css'
import Image from 'next/image'
import { toast } from 'react-toastify'
import { set } from 'firebase/database'
import ReCAPTCHA from 'react-google-recaptcha'

const HomeSections = () => {

    const recaptcha = useRef()
    const context = useContext(GlobalContext)
    const extension = localStorage.getItem('extencion')
    const { state, setState } = context
    const [language, setLanguage] = useState(JSON.parse(localStorage.getItem('language_file')))
    const [terms, setTerms] = useState(false)
    const [type, setType] = useState('contact')
    const path_endpoint = process.env.NEXT_PUBLIC_PATH_END_POINT

    const handle_contact_form_terms = ( element ) => {
        if( element.checked ) {
            element.setAttribute('value', '1')
            setTerms(true)
        } else {
            element.setAttribute('value', '0')
            setTerms(false)
        }
    }

    const sendContactEmail = async (e) => {

        e.preventDefault()

        if( terms === '0' ) {
            toast.error( language.contact.response_please_confirm )
            return false
        }

        const captchaValue = recaptcha.current.getValue()
        if ( !captchaValue ) {
            toast.error( language.contact.response_captcha_error )
            return false
        } 

        try{

            // Form data
            const form = document.getElementById('contact-form')
            const formData = new FormData(form)
            const data = {
                name: formData.get('name'),
                phone: formData.get('phone'),
                email: formData.get('email'),
                message: formData.get('message')
            }

            // Fetch to endpoint for get payment
            const req = await fetch( path_endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "petition" : {
                        "name": "send_user_contact_email",
                        "data": {
                            "send_user_contact_email": {
                                "name": data.name,
                                "phone": data.phone,
                                "email": data.email,
                                "message": data.message,
                                "type": type, 
                                "country": extension
                            }
                        }
                    }
                })
            })
            
            const res = await req.json()
            
            form.reset()
            
            if( res.status === 'error' ) {
                toast.error( language.contact.response_message_error )
            }
            
            else if( res.status === 'success' ) {
                toast.success( language.contact.response_message_success )
            }
    
        } catch ( error ) {
            toast.error( language.contact.response_message_error )
        }
        
        return false

    }
    
    useEffect(() => {

        setLanguage(JSON.parse(localStorage.getItem('language_file')))
        
    }, [ state ] )

    return (<>

        {/* SERVICES  */}
        <div className="page-section features bg-light">
            <div className="container-fluid">
                <div className="row justify-content-center">

                    <div className="col-md-6 col-lg-4 py-3 wow fadeInUp">
                    <div className="d-flex flex-row">
                        <div className="img-fluid mx-3 w-25">
                        <Image src="/images/ico_04.png" width={100} height={100} alt="service_1"/>
                        </div>
                        <div data-section="services" data-value="services1">
                        <h5>{language.services.title1}</h5>
                        <p>
                            {language.services.services1}
                        </p>
                        </div>
                    </div>
                    </div>

                    <div className="col-md-6 col-lg-4 py-3 wow fadeInUp">
                    <div className="d-flex flex-row">
                        <div className="img-fluid mx-3 w-25">
                        <Image src="/images/ico_06.png" width={100} height={100} alt="service_2" />
                        </div>
                        <div data-section="services" data-value="services2">
                        <h5>{language.services.title2}</h5>
                        <p>
                            {language.services.services2}
                        </p>
                        </div>
                    </div>
                    </div>

                    <div className="col-md-6 col-lg-4 py-3 wow fadeInUp">
                    <div className="d-flex flex-row">
                        <div className="img-fluid mx-3 w-25">
                        <Image src="/images/ico_05.png" width={100} height={100} alt="service_3" />
                        </div>
                        <div data-section="services" data-value="services3">
                        <h5>{language.services.title3}</h5>
                        <p>
                            {language.services.services3}
                        </p>
                        </div>
                    </div>
                    </div>

                </div>
            </div> 
        </div> 

        {/* CALL ACTION */}
        <div className="page-section">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 py-3 wow zoomIn">
                    <div className="img-place text-center">
                        <Image 
                            src="/images/bg_image_1_small.jpeg" 
                            alt="info_image" 
                            layout="fill"
                            className="w-100 h-auto"
                            
                        />
                    </div>
                    </div>
                    <div className="col-lg-6 py-3 wow fadeInRight" data-section="call_to_action" data-value="html"> 
                    <h2 className="title-section">{language.call_to_action.give_us}
                    <span className="marked">{language.call_to_action.name}
                    </span> {language.call_to_action.and_we}
                    </h2>
                    <div className="divider"></div>
                        <ul className="m-0 list_home_info">
                            <li><i className="fa-regular fa-circle-check mr-3"></i> 
                                {language.call_to_action.we_search}
                            </li>
                            <li><i className="fa-regular fa-circle-check mr-3"></i> 
                                {language.call_to_action.api_data}
                            </li>
                            <li><i className="fa-regular fa-circle-check mr-3"></i> 
                                {language.call_to_action.search_social}
                            </li>
                            <li><i className="fa-regular fa-circle-check mr-3"></i> 
                                {language.call_to_action.search_engines}
                            </li>
                            <li><i className="fa-regular fa-circle-check mr-3"></i> 
                                {language.call_to_action.search_internet}
                            </li>
                            <li><i className="fa-regular fa-circle-check mr-3"></i> 
                                {language.call_to_action.public_records}
                            </li>
                            <li><i className="fa-regular fa-circle-check mr-3"></i> 
                                {language.call_to_action.news}
                            </li>
                        </ul>
                    </div>
                </div>
            </div> 
        </div> 

        {/* COUNTER */}
        <div className="page-section counter-section pb-0">
            <div className="container-fluid bg-light">
                <div className="row align-items-center text-center" data-section="counter" data-value="html">
                    <div className="col-lg-4">
                    <p>
                        {language.counter.total_searchs}
                    </p>
                    <h2><span className="number" data-number="987786"></span></h2>
                    </div>
                    <div className="col-lg-4">
                    <p>
                        {language.counter.total_results}
                    </p>
                    <h2><span className="number" data-number="987220"></span></h2>
                    </div>
                    <div className="col-lg-4">
                    <p>
                        {language.counter.success_rate}
                    </p>
                    <h2><span className="number" data-number="94"></span>%</h2>
                    </div>
                </div>
            </div> 
        </div> 

        {/* INFO */}
        <div className="page-section pt-0 pb-0" style={{padding:"14px"}}>
            <div className="container">
                <div className="row">
                    
                    <div className="col-md-12  wow zoomIn">
                        <div className="img-place text-center">
                            <Image 
                                src="/images/bg_image_3.jpeg" 
                                alt="info_image"  
                                width={100} 
                                height={100}
                                layout='responsive'
                                className="w-75 h-auto" 

                            />
                        </div>
                    </div>
      
                </div>
            </div> 
        </div> 

        {/* WHY US */}
        <div className="page-section">
            <div className="container" data-section="why_us" data-value="html" >

            <div className="text-center wow fadeInUp">
                <div className="subhead">{language.why_us.title}</div>
                <h2 className="title-section">{language.why_us.find_person}
                <span className="marked">{language.why_us.priority}
                </span> {language.why_us.is_our}
                </h2>
                <div className="divider mx-auto"></div>
            </div>
            
            <div className="row mt-5 text-center">
                <div className="col-lg-4 py-3 wow fadeInUp">
                <div className="display-3 w-25 mb-4 mx-auto mt-auto">
                    <Image src="/images/ico_03.png" width={100} height={100} alt="icon_03" />
                </div>
                <h5>{language.why_us.high_performance}</h5>
                <p> {language.why_us.in_seconds}</p>
                </div>
                <div className="col-lg-4 py-3 wow fadeInUp">
                <div className="display-3 w-50 mb-4 mx-auto mt-auto">
                    <Image src="/images/ico_01.png" width={160} height={160} alt="icon_01" />
                </div>
                <h5>
                    {language.why_us.efficiency}
                </h5>
                <p>
                    {language.why_us.person_found}
                </p>
                </div>
                <div className="col-lg-4 py-3 wow fadeInUp">
                <div className="display-3 w-25 mb-4 mx-auto mt-auto">
                    <Image src="/images/ico_02.png" width={100} height={100} alt="icon_02" />    
                </div>
                <h5>{language.why_us.unlimited_downloads}</h5>
                <p>
                    {language.why_us.always_consult}
                </p>
                </div>
            </div>

            
            </div> 
        </div> 

        {/* TESTIMONIALS */}
        <div className="page-section bg-light w-100">
            <div className="container">
            
            <div className="owl-carousel wow fadeInUp" id="testimonials" >
                
                <div className="item">
                <div className="row align-items-center">
                    <div className="col-md-6 py-3">
                    <div className="testi-image">
                        <Image src="/images/person/person_1.jpg" width={100} height={100} alt="image_person_1" layout='responsive' />
                    </div>
                    </div>
                    <div className="col-md-6 py-3">
                    <div className="testi-content">
                        <p data-section="testimonials" data-value="thanks1">
                            {language.testimonials.thanks1}
                        </p>
                        <div className="entry-footer" data-section="testimonials" data-value="entry_footer1">
                        <strong>{language.testimonials.name1}
                        </strong> &mdash; <span className="text-grey">
                            {language.testimonials.entry_footer1}
                        </span>
                        </div>
                    </div>
                    </div>
                </div>
                </div>

                <div className="item">
                <div className="row align-items-center">
                    <div className="col-md-6 py-3">
                    <div className="testi-image">
                        <Image src="/images/person/person_2.jpg" alt="image_person_2" width={100} height={100} layout='responsive' />
                    </div>
                    </div>
                    <div className="col-md-6 py-3">
                    <div className="testi-content">
                        <p data-section="testimonials" data-value="thanks2">
                            {language.testimonials.thanks2}
                        </p>
                        <div className="entry-footer" data-section="testimonials" data-value="entry_footer2">
                        <strong>{language.testimonials.name2}
                        </strong> &mdash; <span className="text-grey">
                            {language.testimonials.entry_footer2}
                        </span>
                        </div>
                    </div>
                    </div>
                </div>
                </div>

            </div>
            
            </div> 
        </div> 

        {/* PRICES */}
        <div className="banner-pricing border rounded" data-section="prices" data-value="html">
            <center><h2 className="title-section text-center" style={{fontWeigth:"600", fontSize: "28px"}}>{language.prices.ours} <span className="marked">{language.prices.offers}
            </span></h2></center>
            <div className="divider mx-auto"></div>
            <p>
                <span className="marked">{language.prices.trial_price}
                </span> 
                {language.prices.trial_text}
                <strong className="title-section marked">
                    {language.prices.suscription_price}
                </strong>
                <br/>
                {language.prices.info_text}
            </p>
        </div>

        {/* CONTACT */}
        <div className="page-section vh-100" id="contact">
            <div className="container">
            <div className="row align-items-start" data-section="contact" data-value="html">
                <div className="col-lg-6 py-3 px-5 wow fadeInUp" >
                
                <h1 className="title-section ">
                    {language.contact.contact_whit_us}
                </h1>
                <div className="divider"></div>
                
                <p className="text-dark">
                    {language.contact.contact_text}
                </p>
                    
                <div>
                    
                    <form id="contact-form" method="post" onSubmit={ async ( event ) => {
                        return await sendContactEmail( event )
                    }}>
                        
                        <div className="form-group mb-3">
                            <input type="text" className="form-control" id="name" name="name" placeholder={`${language.contact.name}: `} required />
                        </div>
                        
                        <div className="form-group mb-3">
                            <input type="text" className="form-control" id="phone" name="phone" placeholder={`${language.contact.phone}: `}   
                            required />
                        </div>
                        
                        <div className="form-group mb-3">
                            <input type="email" className="form-control" id="email" name="email" 
                            placeholder={`${language.contact.email}: `} 
                            required />
                        </div>

                        <div className="form-group mb-3">
                            <select className="form-control" id="type" name="type" onChange={(e)=>{
                                const type = e.target.value
                                switch(type){
                                    case 'contact':
                                        setType('Contactar con soporte')
                                        break
                                    case 'help':
                                        setType('Ayuda')
                                        break
                                    case 'claim':
                                        setType('Reclamación')
                                        break
                                    default:
                                        setType('Contactar con soporte')
                                        break
                                }
                            }} required >
                                <option value="contact">{language.contact.type_contact}</option>
                                <option value="help">{language.contact.type_help}</option>
                                <option value="claim">{language.contact.type_claim}</option>
                            </select>
                        </div>
                        
                        <div className="form-group mb-3">
                            <textarea className="form-control" id="message" name="message" rows="3" placeholder={`${language.contact.message}: `}
                            required>

                            </textarea>
                        </div>

                        <div className="form-gorup d-flex" style={{fontSize: "1.09rem", marginRight: "10px"}}>
                            

                            <div className="my-2">
                                
                            
                                    <div>
                                        <input type="checkbox" name="terminos" className="m-1"  value="0" id="terms_contact_form" onChange={( event )=>{ return handle_contact_form_terms( event.currentTarget ) } } required />
                                        {language.contact.please_confirm}
                                        <a href="/privacy-policies"> {language.contact.politics}
                                        </a> 
                                        {language.contact.and_the}
                                        <a href="/terms-and-conditions/"> {language.contact.terms}
                                        </a>.
                                        </div>
                                        <div className="d-flex justify-content-center">
                                            <ReCAPTCHA ref={recaptcha} sitekey={process.env.NEXT_PUBLIC_GRECAPTCHA_SITE_PUBLIC_KEY} />
                                        </div>
                                        <div className="d-flex justify-content-center">
                                           
                                            <button type="submit" className="btn btn-primary w-50 my-3">
                                                {language.contact.send}
                                            </button>
                                        </div>

                                    </div>

                                    
                                <div>
                                
                            
                            </div>
                    
                        </div>
                    </form>

                </div>
                    
                </div>
                <div className="col-lg-6 py-3 wow fadeInUp text-center">
                    <i className="fas fa-paper-plane"></i>
                    <h3 className="title-section">		  
                        <span className="marked">
                            {language.contact.do_reclaim}
                        </span> 
                        <br/>
                        {language.contact.reclaim_info}
                    </h3>
                <div className="divider w-100"></div>
                
                <h3 className="title-section">
                {language.contact.we_will_help}
                <span className="marked">
                {language.contact.use_the}
                </span> {language.contact.domain}
                
                
                
                </h3>
                
                
                </div>

            </div>
            </div> 
        </div> 

    </>)

}

export default HomeSections
'use client'
import { useEffect, useState, useContext } from 'react'
import GlobalContext from '../context/GlobalContext'
import './css/home-sections.css'
import Image from 'next/image'
import Link from 'next/link'

const HomeSections = () => {

    const context = useContext(GlobalContext)
    const { state, setState } = context
    const [language, setLanguage] = useState(JSON.parse(localStorage.getItem('language_file')))

    //Obteniendo el parametro de la url
    const urlParams = new URLSearchParams(window.location.search)
    const is_contact = urlParams.get('contact')
    
    useEffect(() => {

        setLanguage(JSON.parse(localStorage.getItem('language_file')))
        
        if( is_contact ){
            const intervalId = setInterval(() => {
                const element = document.getElementById( 'contact' )
                if ( element ) {
                    element.scrollIntoView( { behavior: 'smooth' } )
                    clearInterval( intervalId )
                }
            }, 100 ) 
        }

    }, [ state, is_contact ] )

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
                    
                    <form id="contact-form" method="post">
                        
                        <div className="form-group mb-3">
                            <input type="text" className="form-control" id="nombre" name="nombre" placeholder={`${language.contact.name}: `} required />
                        </div>
                        
                        <div className="form-group mb-3">
                            <input type="text" className="form-control" id="telefono" name="telefono" placeholder={`${language.contact.phone}: `}   
                            required />
                        </div>
                        
                        <div className="form-group mb-3">
                            <input type="email" className="form-control" id="correo" name="correo" 
                            placeholder={`${language.contact.email}: `} 
                            required />
                        </div>
                        
                        <div className="form-group mb-3">
                            <textarea className="form-control" id="mensaje" name="mensaje" rows="3" placeholder={`${language.contact.message}: `}
                            required>

                            </textarea>
                        </div>

                        <div className="form-gorup d-flex" style={{fontSize: "1.09rem", marginRight: "10px"}}>
                            

                            <div className="my-2">
                                
                            
                            <div>
                                <input type="checkbox" name="terminos" className="m-1" required value="1" />
                                {language.contact.please_confirm}
                                <a href="/privacy-policies"> {language.contact.politics}
                                </a> 
                                {language.contact.and_the}
                                <a href="/terms-and-conditions/"> {language.contact.terms}
                                </a>.
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
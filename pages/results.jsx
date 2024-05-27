'use client'
import {useState, useEffect, useContext} from 'react'
import GlobalContext from '@/context/GlobalContext'
import Image from 'next/image'
import PdfRenderer from '@/components/PdfRenderer'
import { PDFDownloadLink } from '@react-pdf/renderer'
import PDLJS from 'peopledatalabs'
import { FaSearch, FaPhone, FaEnvelope, FaSpinner, FaDownload, FaInfoCircle, FaMapMarked }
from 'react-icons/fa'
import './css/results.css'
import { useRouter } from 'next/navigation'

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

const GetSerpstakResults = async ( search, lang ) =>{

    try{

        // Fetch to endpoint for update suscription
        const req = await fetch( '/api/serpstak/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "query" : search,
                "lang": lang
            })
        })

        return await req.json()

    } catch ( error ) {
        return false
    }

}

const SaveDownload = async ( user, data ) => {
    try{

        // Fetch to endpoint for update suscription
        const req = await fetch( path_endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "petition" : {
                    "name": "save_download",
                    "data": {
                        "save_download": {
                            "user_email": user.email,
                            "data": JSON.stringify(data)
                        }
                    }
                }
            })
        })

        const res = await req.json()
        return res

    } catch ( error ) {
        return false
    }

}

const Results = () => {
    
    const context = useContext(GlobalContext)
    const { state } = context

    const search = localStorage.getItem('search')
    const search_type = localStorage.getItem('search_type')
    const user = JSON.parse( localStorage.getItem('user') )
    const lang = localStorage.getItem('language')
    const countrie = localStorage.getItem('countrie')

    const [dataPerson, setDataPerson] = useState( null )
    
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    
    const [language, setLanguage] = useState(JSON.parse(localStorage.getItem('language_file')))

    const [serpstakResults, setSerpstakResults] = useState(null)

    const router = useRouter()
    
    const setRegionRegionHandler = (e) => {
        setRegion(e.target.value)
        getRegionAndLocality(e.target.value)
    }

    const setLocalityHandler = (e) => {
        setLocation(e.target.value)
        setLocality(e.target.value)
        fetchPersonData()
    }

    const getRegionAndLocality = async ( slected_country=null ) => {
        
        const headers = {
            "Accept": "application/json",
            "api-token": "ntMSLDp1DAfusf5HPZNhCJsGmOhUr59i30q9PoFpJljQ5Trt1piMs_QgK9E8Hqekj2E",
            "user-email": "hharoldypruebas@gmail.com"
        }

        await fetch('https://www.universal-tutorial.com/api/getaccesstoken', {
            method: 'GET',
            headers: headers
        }).then( async res => {
            const data = await res.json()
            
            if( data.auth_token ){
                
                const headers = {
                    "Authorization": `Bearer ${data.auth_token}`,    
                    "Accept": "application/json"
                }
                
                await fetch('https://www.universal-tutorial.com/api/countries/', {
                    method: 'GET',
                    headers: headers
                }).then( async res => {
                    const data = await res.json()
                    document.getElementById('countries-select').innerHTML = `<option value=${ slected_country ? slected_country : null }>${slected_country ? slected_country : 'Seleccione un pais '}</option>`
                    data.map( async ( country ) => {
                        document.getElementById('countries-select').innerHTML += `<option value="${country.country_name}">${country.country_name}</option>`  
                    })
                    
                    await fetch(
                        `https://www.universal-tutorial.com/api/states/${slected_country}`, 
                    {
                        method: 'GET',
                        headers: headers

                    }).then( async res => {
                        const data = await res.json()
                        
                        document.getElementById('cities-select').innerHTML = `<option value="" disabled > Seleccione una ciudad </option>`
                        data.map( async ( city ) => {
                            document.getElementById('cities-select').innerHTML += `<option value="${city.state_name}">${city.state_name}</option>`
                        })
                        
                    })

                })

            }

            else{
                //console.log('No se pudo obtener el token de acceso')
            }

        }).catch( error => {
            //console.log(error)
        })

    }

    const handleDownloadClick = () => {
        SaveDownload( user, dataPerson ).then( res => {
            if( !res ) return false
            return true
        })
    }

    const fetchPersonData = async () => {
    
        try {

            const PDLJSClient = new PDLJS({ apiKey: process.env.NEXT_PUBLIC_SEARCHS_API_KEY })

            let params = {
                min_likelihood: 100,
                titlecase: true,
                include_if_matched: false,
                pretty: true
            }
            
            // Validando el tipo de busqueda
            if( search_type === 'name' ) {

                params = {
                    ...params,
                    name: search,
                    first_name: search.split(' ')[0],
                    middle_name: search.split(' ')[1],
                    last_name: search.split(' ')[2] || search.split(' ')[3] || search.split(' ')[1],
                    country: countrie
                }

            } 
            
            else if( search_type === 'phone' ) {
                params = {
                    ...params,
                    phone: search, 
                }
            }

            else if( search_type === 'email' ) {
                params = {
                    ...params,
                    email: search, 
                }
            }

            else if( search_type === 'address' ) {
                params = {
                    ...params,
                    street_address: search.split(/,| /)[0].toLocaleLowerCase(),
                    locality: search.split(/,| /)[1].toLocaleLowerCase(),
                    region: search.split(/,| /)[2].toLocaleLowerCase(),
                    country: search.split(/,| /)[3].toLocaleLowerCase()
                }
            }

            PDLJSClient.person.enrichment( params ).then(( data ) => {
                
                //setDataPerson( dataPerson )
                setDataPerson( data.data )
                setLoading( false )
                

            }).catch((error) => {
                setError(error)
                setLoading( false )
            })

        } catch (error) {
            setError(error)
            setLoading( false )
        }

    }

    const fetchSerpstakResults = async () => {
        GetSerpstakResults( search, lang ).then( res => {
            if( !res ) return false
            setSerpstakResults( res )
        }).catch( error => {
            // TODO: Implementar un mensaje de error
            setError( error )
        }).finally( () => {
            setLoading( false )
        })
    }

    useEffect( () => {
        
        GetSuscription( user ).then( suscripted => {
            
            if(search === 'null') router.push('/')
            else if( user && !suscripted ) router.push('/payment')
            else if( !user ) router.push('/register')

        })

    }, [] )

    useEffect(() => {

        getRegionAndLocality()
        //fetchPersonData()
        fetchSerpstakResults()

    }, [] )

    if( loading ) return (<div className="results-container p-0">
        <div className="container">
            <div className="row px-5 content-search-map-anime">
                <div className="col-md-12 vh-100 d-flex flex-column justify-content-center align-content-center ">
                    <div className="d-flex flex-column">
                        <div className="title-section w-50 m-auto text-center">
                            <Image src="/images/logo_find-persons.png" alt="logo" className="img-fluid w-50" width={100} height={100} />
                            <h4 className="text-primary my-3">{ language.results.results_of } { search } </h4>
                        </div>
                        <div className="d-flex justify-content-center">
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">
                                    {language.results.loading}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>)

    return (<>
 
            <div className="results-container">
                <div className="container">
                    <div className="row mb-5 shadow px-3 rounded2x primary-row-results">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 p-2 info-results">
                        <div className="d-flex px-3 flex-column">
                        <h2 className="text-center text-secondary title-section mt-4">
                            {language.results.results} 
                        </h2>
                        <p className="text-center text-secondary mb-0 ">
                            {language.results.is_not_people} <br/>
                            <a href="/" className='btn btn-primary btn-sm rounded-pill m-3 decoration-none'
                            >{language.results.try_search} <FaSearch className='mx-2' />
                            </a>
                        </p>
                        </div>
                        <div className="info-service d-flex flex-column p-4">
                            <div className="d-flex content-result-image shadow rounded m-auto justify-content-center">
                                <Image src="/images/no_user_image.jpeg" alt="results-holder" className="img-fluid rounded w-100" width={100} height={100} />
                            </div>
                            <div className="d-flex flex-column p-3 m-auto w-100">
                                <h3 className="text-center text-secondary title-section mb-4">
                                <span className="marked">
                                    {search}
                                </span><br/>
                                {language.results.general_description}
                                </h3>
                                {/* <div className="text-secondary my-3">
                                    <div className="info-persons card shadow border rounded bg-white w-75 m-auto p-2">

                                        <p className='text-secondary title-section'>
                                            { dataPerson && dataPerson.sex === "Male" ? language.results.male : language.results.famale }
                                            { dataPerson && dataPerson.sex === "Male" ? language.results.burned_male : language.results.burned_famale } { language.results.he } 
                                            { dataPerson && dataPerson.birth_date ? dataPerson.birth_date : ' - n/a - ' }  
                                            { language.results.actualy} <span className='marked'> { dataPerson && dataPerson.location_name ? dataPerson.location_name : ' - n/a - ' } </span> 
                                        </p>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-center content-image-clue">
                                    <Image src="/images/bg_image_3.png" alt="secure-payment" className="img-fluid w-50" width={100} height={100} layout='responsive' />
                                </div> */}
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 p-2 wrap-results-form">
                        <div className="d-flex px-3 flex-column">

                            {/* <h2 className="text-center text-secondary title-section mt-4">
                                {language.results.contact_info}
                            </h2>
                            <div className="person-contact-section">
                               
                                <div className="info-contact-persons card shadow border rounded bg-white w-75 m-auto p-2">
                                    
                                    <p>
                                        <FaPhone className="mx-2" />
                                        {language.results.mobile_phone} <span className='marked'> { dataPerson && dataPerson.mobile_phone ? dataPerson.mobile_phone : ' - n/a - ' } </span><br/>

                                        <FaEnvelope className="mx-2" />
                                        {language.results.personal_email} <span className='marked'> { dataPerson && dataPerson.recommended_personal_email ? dataPerson.recommended_personal_email : ' - n/a - ' } </span><br/>

                                        <FaMapMarked className="mx-2" />
                                        { language.results.location } { dataPerson && dataPerson.location_locality ? dataPerson.location_locality : ' - n/a - ' }, { dataPerson && dataPerson.location_country ? dataPerson.location_country : ' - n/a - ' }, 
                                        
                                    </p>
                                    
                                </div>
                                
                            </div> <br/> */}

                            {
                                serpstakResults.response.organic_results && <div className="d-flex flex-column p-3 m-auto w-100">
                                    <h3 className="text-center text-secondary title-section mb-4">
                                        {language.results.search_results}
                                    </h3>
                                    <div className="text-secondary my-3">
                                        <div className="info-persons card shadow border rounded bg-white w-75 m-auto p-2">
                                            <p>
                                                <ul>
                                                    { serpstakResults.response.organic_results.map( ( result, index ) => {
                                                        return <li key={index} className='text-secondary'>
                                                            <h3 className='text-secondary'>{result.title}</h3>
                                                            <p>{result.snippet}</p>
                                                            <a href={result.url} className='decoration-none'>
                                                                {result.title}
                                                            </a>
                                                        </li>
                                                    }) }
                                                </ul>
                                            </p>
                                        </div>

                                    </div>
                                </div>
                            }

                            <h2 className="text-center text-secondary title-section mt-4">
                                {language.results.download_complete_info}
                            </h2>

                            <PDFDownloadLink 
                                document={<PdfRenderer dataPerson={ serpstakResults } />} 
                                fileName="data_person.pdf" 
                                style={{ textAlign: "center" }} 
                                onClick={handleDownloadClick}
                            >
                                {({ blob, url, loading, error }) => {
                                    
                                    return loading ? 
                                        <button className="btn btn-danger text-light fs-4 btn-sm rounded-pill m-auto w-50 fs-5 download-btn" >
                                            <FaSpinner className="mx-1" />
                                            {language.results.download_pdf}
                                        </button> 
                                    : 
                                        <button className="btn btn-warning text-dark fs-4 btn-sm rounded-pill m-auto w-50 fs-5 download-btn">
                                            <FaDownload className="mx-1" />
                                            {language.results.download_pdf}
                                        </button>

                                }}
                            </PDFDownloadLink>

                            <div className="w-75 shadow rounded m-auto my-3 p-3 bg-white note-info">
                                <FaInfoCircle className="mx-2" style={{ fontSize: "2rem" }} />
                                {language.results.download_text_info}
                            </div>
                            
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            
            {/* PARA TEST */}
            {/* <div className="container py-5 my-5 w-75">
                <div className="row px-5 content-search-map-anime">
                
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h4>Resultados de {search}</h4>
                            </div>
                            <div className="card-body">
                                {serpstakResults && <pre>{ JSON.stringify( serpstakResults, null, 2) }</pre>}
                                {error && <p>Error: { error.message }</p>}
                            </div>
                        </div>
                    </div>

                </div>
            </div> */}



    </>)

}

export default Results












    
 
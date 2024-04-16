'use client'
import { useContext, useState, useEffect, useCallback } from "react"
import GlobalContext from '@/context/GlobalContext'
import VantaGlobe from '@/components/VantaGlobe'
import './css/search.css'
import Image from 'next/image'
import { redirect } from "next/dist/server/api-utils"
import Loader from '@/components/Loader'

const Search = () => {
    
    const context = useContext( GlobalContext )
    const { state, setState } = context

    const search = localStorage.getItem('search').toString()
    const [text_search_info, setTextSearchInfo] = useState('')
    const [awaitText, setAwaitText] = useState('')
    const [activeClass, setActiveClass] = useState('')
    const [redirectTo, setRedirectTo] = useState('/')

    const [stateIcon, setStateIcon] = useState('fa-spinner')
    const [listOfSearchs, setListOfSearchs] = useState([])
    
    // Handdler para comprobar si el usuario esta suscrito
    const is_suscripted = useCallback( async () => {

        const path_endpoint = process.env.NEXT_PUBLIC_PATH_END_POINT
        const user = JSON.parse( localStorage.getItem('user') )

        try{

            if( !user ) {
                setRedirectTo('/register')
            }

            else {
                
                // Fetch to endpoint for get suscription
                const response = await fetch( path_endpoint, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        "petition" : {
                            "name": "get_suscription",
                            "data": {
                                "get_suscription": {
                                    "user_email": user.email
                                }
                            }
                        }
                    })
                })

                await response.json().then( result => {
                    
                    if ( result.status !== 'error' ) {
                        setState( state => ({ ...state, suscription: result.data }) )
                        setRedirectTo('/results')
                    }

                    else{
                        setRedirectTo('/payment')
                    }

                } )

            }
    

        } catch( error ) { 
            setState( state => ({ ...state, suscription: null }) )
            setRedirectTo('/payment')
        }

    }, [] )

    const getLanguageFile = useCallback( async () => {
        
        const language = state.language
        const req = await fetch(`/languajes/${language}.json`).then( res => res )
        .catch( err => console.error( err ) )
        const res = await req.json()
        const { search_page } = res

        return search_page

        
    }, [  state.language ] )

    useEffect(() => {
        
        getLanguageFile().then( (res) => {

            setListOfSearchs([
                res.socials, 
                res.work,
                res.address, 
                res.telephone, 
                res.email, 
                res.news, 
                res.histories
            ])

        })
    }, [ getLanguageFile ])

    useEffect(() => { 

        let count = 0
        let random = 0
        let random_item = null

        const time = setInterval(() => {

            setTextSearchInfo(listOfSearchs[count])
    
            if ( count === 5 ) {
                clearInterval(time)
                setStateIcon('fa-check')
                setAwaitText('')
                setActiveClass('active')
                is_suscripted()
            }
    
            count++
    
            random = Math.floor( Math.random() * count ) + 0
            random_item = document.getElementById( random )
    
            if ( random_item ) {
                random_item.classList.remove('fa-spinner')
                random_item.classList.add('fa-check')
            }

            

        }, 5000)
         

    }, [  is_suscripted, listOfSearchs ] )

    if( !search ) {
        window.location.replace('/')
        return (<Loader/>)
    }

    else if( redirectTo !== '/' ) {
        window.location.replace( redirectTo )
        return (<Loader/>)
    }

    return (<>
        
        <div className="container-fluid py-5" id="vanta-anime">
        
            <div className="row px-5 content-search-map-anime w-50 m-auto my-5 mb-3 border shadow rounded bg-white" id="vanta-bg">
                <div className="col-md-12" >

                    <h1 className="title-section fs-1 my-4 text-center">
                        <span data-section="search_page" data-value="we_searching">Estamos Buscando a</span> 
                        <span id="search" className="marked"> {state.search} </span>
                        <span data-section="search_page" data-value="in_the" >En todos los registros.</span>
                    </h1>

                    <div className="animate_search shadow border rounded">
                        <Image src="/images/mapa_anime.gif" class="rounded" alt="" width={100} height={100} layout="responsive" />
                    </div>

                    <div className={`wrapper ${activeClass}`}>

                        { awaitText ? awaitText : 
                        
                            <div className="bg">
                                <div className="el"></div>
                            </div>

                        }
                        
                    </div>
        
                    <h1 className="text-center my-4 fs-3">
                        <b id="text-search-info">{text_search_info}</b>
                    </h1>

                    <div className="content-checks-animate mb-3">
                        
                        <div className="container text-center">
                            
                            <ul className="checks-animate">
                    
                                <li className="item-check">
                                    <i className={`fa ${stateIcon} mx-2`} id="0"></i>
                                    <b data-section="search_page" data-value="socials">{listOfSearchs[0]}</b>
                                </li>

                                <li className="item-check">
                                    <i className={`fa ${stateIcon} mx-2`} id="1"></i>
                                    <b data-section="search_page" data-value="address">{listOfSearchs[1]}</b>
                                </li>

                                <li className="item-check">
                                    <i className={`fa ${stateIcon} mx-2`} id="2"></i>
                                    <b data-section="search_page" data-value="telephone">{listOfSearchs[2]}</b>
                                </li>

                                <li className="item-check">
                                    <i className={`fa ${stateIcon} mx-2`} id="3"></i>
                                    <b data-section="search_page" data-value="email">{listOfSearchs[3]}</b>
                                </li>

                                <li className="item-check">
                                    <i className={`fa ${stateIcon} mx-2`} id="4"></i>
                                    <b data-section="search_page" data-value="news">{listOfSearchs[4]}</b>
                                </li>

                                <li className="item-check">
                                    <i className={`fa ${stateIcon} mx-2`} id="5"></i>
                                    <b data-section="search_page" data-value="histories">{listOfSearchs[5]}</b>
                                </li>

                            </ul>

                        </div>
                    
                    </div>
        
                </div>
            </div>
            <div className="divider w-100 m-0"></div>
            <div className="row px-5 w-75 m-auto bg-white m-3 my-3 border shadow rounded">

                

                <div className="col-lg-6 py-3">
        
                    <div className="img-place text-center">
                        <Image src="/images/bg_image_1_small.jpeg" className="mt-0" alt="" width={100} height={100} layout="responsive" />
                    </div>
        
                </div>
        
                <div className="col-md-6">
                    
                    <div className="d-flex flex-column list-media py-5">
                        <div className="d-flex align-items-start my-2">
                            <i className="fas fa-user-check fa-2x mx-3" style={{minWidth: '40px'}}></i>
                            <div>
                                <h6 className="mt-0 mb-1 fw-bold" data-section="search_page" data-value="title_accounts">Rastreo de Perfiles</h6>
                                <p className="text-muted" data-section="search_page" data-value="accounts_description">
                                Encuentre informes detallados sobre personas, incluyendo datos de contacto, historial personal, vínculos profesionales y registros públicos extensivos.
                                </p>
                            </div>
                        </div>
                        <div className="d-flex align-items-start my-2">
                            <i className="fas fa-map-marker-alt fa-2x mx-3" style={{minWidth: '40px'}}></i>
                            <div>
                                <h6 className="mt-0 mb-1 fw-bold" data-value="title_location" data-section="search_page">Localización de Direcciones</h6>
                                <p className="text-muted" data-section="search_page" data-value="location_description">
                                Acceda rápidamente a direcciones actuales y anteriores de individuos, determinando si son propietarios o inquilinos, mediante nuestra herramienta de búsqueda.
                                </p>
                            </div>
                        </div>
                        <div className="d-flex align-items-start my-2">
                            <i className="fas fa-users fa-2x mx-3" style={{minWidth: '40px'}}></i>
                            <div>
                                <h6 className="mt-0 mb-1 fw-bold" data-section="search_page" data-value="title_explore">Exploración en Redes Sociales</h6>
                                <p className="text-muted" data-section="search_page" data-value="explore_description">
                                Investigue perfiles online, incluyendo actividades en redes sociales y plataformas de citas, con nuestra herramienta de búsqueda de perfiles públicos y ocultos.
                                </p>
                            </div>
                        </div>
                    </div>
                    
                   
                    
                </div>
        
            </div>

        </div>
        <VantaGlobe el="#vanta-anime" />
    </>)
    
}

export default Search
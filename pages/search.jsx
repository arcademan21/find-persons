'use client'
import { useContext, useState, useEffect } from "react"
import GlobalContext from '@/context/GlobalContext'
import Image from 'next/image'
import './css/search.css'
import { FaSpinner, FaCheck, FaUser, FaMapMarkedAlt, FaUsers } from 'react-icons/fa'

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
        if( res.status === 'error' ) return false
        return res

    } catch ( error ) {
        return false
    }

}

const Search = () => {  
    
    const context = useContext( GlobalContext )
    const { state, setState } = context

    const search = localStorage.getItem('search')
    const language = JSON.parse( localStorage.getItem('language_file') ).search_page
    const user = JSON.parse( localStorage.getItem('user') )
    
    const [text_search_info, setTextSearchInfo] = useState('')
    const [awaitText, setAwaitText] = useState('')
    const [activeClass, setActiveClass] = useState('')
    const [stateIcon1, setStateIcon1] = useState(true)
    const [stateIcon2, setStateIcon2] = useState(true)
    const [stateIcon3, setStateIcon3] = useState(true)
    const [stateIcon4, setStateIcon4] = useState(true)
    const [stateIcon5, setStateIcon5] = useState(true)
    const [stateIcon6, setStateIcon6] = useState(true)

    const [listOfSearchs, setListOfSearchs] = useState([])

    useEffect(() => {
        if( !search ) window.location.replace('/')
        setListOfSearchs([
            language.socials, 
            language.work,
            language.address, 
            language.telephone, 
            language.email, 
            language.news, 
            language.histories
        ])

    }, [])

    useEffect(() => { 

        let count = 0
        let random = 0
        let random_item = null

        const time = setInterval(() => {

            setTextSearchInfo(listOfSearchs[count])
    
            if ( count === 5 ) {
                
                clearInterval(time)
                
                setAwaitText('') 
                setActiveClass('active')
                document.getElementsByClassName('wrapper')[0].innerHTML = '100%'
                GetSuscription( user ).then( suscripted => {
                    
                    // Redirect 
                    if( !user ) window.location.replace('/register')
                    else if( !suscripted ) window.location.replace('/payment')
                    else window.location.replace('/results')
        
                })
                
            }
            
            else {
                count++
    
                random = Math.floor( Math.random() * count ) + 0
        
                switch ( random ) {
                    case 0: setStateIcon1(false); break;
                    case 1: setStateIcon2(false); break;
                    case 2: setStateIcon3(false); break;
                    case 3: setStateIcon4(false); break;
                    case 4: setStateIcon5(false); break;
                    case 5: setStateIcon6(false); break;
                }
            }

            

        }, 5000)
         

    }, [ listOfSearchs ] )

    return (<>
        
        <div className="container py-5" >
        
            <div className="row content-search-map-anime my-3 mt-5 align-content-center" >
                
                <div className="col-sm-12 col-md-6 col-lg-6">
                    <div className="animate_search">
                        <Image src="/images/mapa_anime.gif" className="rounded " alt="" width={100} height={100} layout="responsive" />
                    </div>
                </div>

                <div className="col-sm-12 col-md-6 col-lg-6" >
                    <div className="percent-bar-content">
                        
                        <h3 className="title-section my-4 title-searching">
                            <span data-section="search_page" data-value="we_searching">
                                { language.we_searching }
                            </span> 
                            <span id="search" className="marked"> { search } </span>
                            <span data-section="search_page" data-value="in_the" >
                                { language.in_the }
                            </span>
                        </h3>

                        <div className={`wrapper w-100 ${ activeClass }`}>

                            { awaitText ? awaitText : 
                                <div className="bg">
                                    <div className="el"></div>
                                </div>
                            }
                            
                        </div>
            
                        <h1 className="text-center my-4 fs-3">
                            <b id="text-search-info">{ text_search_info }</b>
                        </h1>

                    </div>
                        
                    <div className="content-checks-animate mb-3">
                        
                        <div className="container text-center">
                            
                            <ul className="checks-animate">
                    
                                <li className="item-check">
                                    {stateIcon1 ? <FaSpinner className="mx-2 fa-spin" /> : <FaCheck className="mx-2" />}
                                    <b data-section="search_page" data-value="socials">{listOfSearchs[0]}</b>
                                </li>

                                <li className="item-check">
                                    {stateIcon2 ? <FaSpinner className="mx-2 fa-spin" /> : <FaCheck className="mx-2" />}
                                    <b data-section="search_page" data-value="address">{listOfSearchs[1]}</b>
                                </li>

                                <li className="item-check">
                                    {stateIcon3 ? <FaSpinner className="mx-2 fa-spin" /> : <FaCheck className="mx-2" />}
                                    <b data-section="search_page" data-value="telephone">{listOfSearchs[2]}</b>
                                </li>

                                <li className="item-check">
                                    {stateIcon4 ? <FaSpinner className="mx-2 fa-spin" /> : <FaCheck className="mx-2" />}
                                    <b data-section="search_page" data-value="email">{listOfSearchs[3]}</b>
                                </li>

                                <li className="item-check">
                                    {stateIcon5 ? <FaSpinner className="mx-2 fa-spin" /> : <FaCheck className="mx-2" />}
                                    <b data-section="search_page" data-value="news">{listOfSearchs[4]}</b>
                                </li>

                                <li className="item-check">
                                    {stateIcon6 ? <FaSpinner className="mx-2 fa-spin" /> : <FaCheck className="mx-2" />}
                                    <b data-section="search_page" data-value="histories">{listOfSearchs[5]}</b>
                                </li>

                            </ul>

                        </div>
                    
                    </div>
        
                </div>


            </div>
            <div className="divider w-100 m-0"></div>
            <div className="row my-3">

                <div className="col-md-6">
        
                    <div className="img-place text-center">
                        <Image src="/images/bg_image_1_small.jpeg" className="mt-0" alt="" width={100} height={100} layout="responsive" />
                    </div>
        
                </div>
        
                <div className="col-md-6">
                    
                    <div className="d-flex flex-column list-media py-5">
                        <div className="d-flex align-items-start my-2">
                            
                            <FaUser className="mx-3" style={{fontSize: '6rem',
                            color: '#6b53f2'}} />
                            <div>
                                <h6 className="mt-0 mb-1 fw-bold" data-section="search_page" data-value="title_accounts">
                                    {language.title_accounts}
                                </h6>
                                <p className="text-muted" data-section="search_page" data-value="accounts_description">
                                    {language.accounts_description}
                                </p>
                            </div>
                        </div>
                        <div className="d-flex align-items-start my-2">
                            
                            <FaMapMarkedAlt className="mx-3" style={{fontSize: '6rem',
                            color: '#6b53f2'}} />
                            <div>
                                <h6 className="mt-0 mb-1 fw-bold" data-value="title_location" data-section="search_page">
                                    {language.title_location}
                                </h6>
                                <p className="text-muted" data-section="search_page" data-value="location_description">
                                    {language.location_description}
                                </p>
                            </div>
                        </div>
                        <div className="d-flex align-items-start my-2">
                
                            <FaUsers className="mx-3" style={{fontSize: '6rem',
                            color: '#6b53f2'}} />
                            <div>
                                <h6 className="mt-0 mb-1 fw-bold" data-section="search_page" data-value="title_explore">
                                    {language.title_explore}
                                </h6>
                                <p className="text-muted" data-section="search_page" data-value="explore_description">
                                    {language.explore_description}
                                </p>
                            </div>
                        </div>
                    </div>
                    
                   
                    
                </div>
        
            </div>

        </div>
        
    </>)
    
}

export default Search
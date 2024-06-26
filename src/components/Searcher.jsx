'use client'
import { useContext, useState, useEffect, useCallback } from "react" 
import GlobalContext from '@/context/GlobalContext'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './css/searcher.css'
import { FaGlobe, FaSearch } from "react-icons/fa"
import { useRouter } from 'next/navigation'

const Searcher = () => {    
    
    const context = useContext( GlobalContext )
    const { state, setState } = context
    const extension = localStorage.getItem('extencion')
    
    const [language, setLanguage] = useState(JSON.parse(localStorage.getItem('language_file')).hero)
    const [search, setSearch] = useState(null)
    const [searchType, setSearchType] = useState(null) 
    const [searchTypeEval, setSearchTypeEval] = useState('name')
    const [textHolder, setTextHolder] = useState(null)
    const [option, setOption] = useState(null)

    const language_toast = JSON.parse(localStorage.getItem('language_file')).toast

    const router = useRouter()
   
    const setType = useCallback( ( type ) => {
        
        const placeholders = {
            name: language.placeholder_name,
            email: language.placeholder_email,
            phone: language.placeholder_phone,
            address: language.placeholder_address
        }

        const textList = {
            name: language.name,
            email: language.email,
            phone: language.phone,
            address: language.address
        }

        setOption( type )
        setSearchType( textList[type] )
        setSearchTypeEval( type )
        setTextHolder( placeholders[type] )
        localStorage.setItem( 'search_type', type )
        
    }, [ language ])

   

    const validateSearch = ( search ) => {
            
        let regex = null

        switch ( option ) {
            case 'name': regex = /^.{3,}$/ 
            break
            case 'email': regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
            break
            case 'phone': regex = /^[0-9+\-\s]{9,}$/
            break
            case 'address': regex = /^\w+\s\d+[\w\s,]*$/
            break
            case 'user_name': regex = /^[a-zA-Z0-9._-]+$/
            break
            default: break
        }

        return regex.test( search ) 

    }

    const handleSearch = () => {

        if( search === null || search === '' ) 
            toast.warning(language_toast.empty_search_error_message)
        else{

            setState({ ...state, search })
            let data = validateSearch( search )

            if( !data ){
                
                if( option === 'name' )
                    toast.error(language_toast.name_error_message)
                else if( option === 'email' )
                    toast.error(language_toast.email_error_message)
                else if( option === 'phone' )
                    toast.error(language_toast.phone_error_message)
                else if( option === 'address' )
                    toast.error(language_toast.address_error_message)

            }
                
            else{ 
                if( extension !== null && extension !== '' && extension !== '/'){
                    router.push(`${extension}/search`)
                    
                }
                else{
                    router.push('/search')
                }
            }

        }

    }

    const changeInput = (e) => {
        setSearch(e.target.value)
        localStorage.setItem('search', e.target.value)
    }

    useEffect(() => {
        localStorage.setItem('search', null)
    }, [])

    useEffect(() => {
        
        const storedLanguage = JSON.parse(localStorage.getItem('language_file')).hero
        if ( storedLanguage ) {
            setLanguage(storedLanguage)
            setSearchType(storedLanguage.name)
            setTextHolder(storedLanguage.placeholder_name) 
        }

    }, [state])

    useEffect(() => {
        
        setOption( localStorage.getItem('search_type'))
        setType( localStorage.getItem('search_type'))

    }, [setType, option, language])

    return (<>
        <div className="col-xs-6 col-sm-6 col-md-12 col-lg-6 mx-auto my-4 wow fadeInUp d-flex flex-column h-100 py-sm-5 justify-content-center content-searcher">
            <h1 className="mb-2 fs-1 text-center title-section" >
                <span>{language.title}</span><br/>
                <span className="marked mx-2">
                    {searchType}
                </span> 
                <span>{language.holder_title}</span>
            </h1>
            <p className="text-lg text-center my-2" data-section="hero" data-value="sub_title">
                {language.sub_title}
            </p>

            <div className="selectType p-3 text-center d-flex" id="selectType">
                <ul className="m-0 w-100 d-flex justify-content-evenly flex-wrap">
                    <li className={`btn my-1 px-0 ${option === 'name' ? 'active' : ''}`} onClick={() => setType('name')}><span className="full_name" data-section="hero" data-value="name">
                    {language.name}
                    </span></li>
                    <li className={`btn my-1 px-0 ${option === 'email' ? 'active' : ''}`} onClick={() => setType('email')}><span className="work_email" data-section="hero" data-value="email">
                    {language.email}
                    </span></li>
                    <li className={`btn my-1 px-0 ${option === 'phone' ? 'active' : ''}`} onClick={() => setType('phone')}><span className="mobile_phone" data-section="hero" data-value="phone">
                    {language.phone}
                    </span></li>
                    <li className={`btn my-1 px-0 ${option === 'address' ? 'active' : ''}`} onClick={() => setType('address')}><span className="location_name" data-section="hero" data-value="address">
                    {language.address}
                    </span></li>
                </ul>
            </div>

            <div>
                
                <input type="text" name="search" id="search" className="shearching-input form-control" placeholder={textHolder} onChange={changeInput} autoFocus />

                <div className="text-center">
                    
                    <button type="button" id="searchButton" className="btn btn-primary btn-split btn-searchin-persons ml-2" onClick={handleSearch}>
                        <span data-section="hero" data-value="search_now">
                            {language.search_now}
                        </span>
                        
                        <FaSearch className="fs-1 mx-2" />
                    </button>
                    
                </div>

            </div>
        </div>
    </>)
}

export default Searcher
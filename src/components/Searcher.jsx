'use client'
import { useContext, useState, useEffect, useCallback } from "react" 
import GlobalContext from '@/context/GlobalContext'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './css/searcher.css'
import { FaGlobe, FaSearch } from "react-icons/fa"

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
    const countries = ['åland islands','afghanistan','albania','algeria','american samoa','andorra','angola','anguilla','antarctica','antigua and barbuda','argentina','armenia','aruba','australia','austria','azerbaijan','bahamas','bahrain','bangladesh','barbados','belarus','belgium','belize','benin','bermuda','bhutan','bolivia','bosnia and herzegovina','botswana','bouvet island','brazil','british indian ocean territory','british virgin islands','brunei','bulgaria','burkina faso','burundi','cambodia','cameroon','canada','cape verde','caribbean netherlands','cayman islands','central african republic','chad','chile','china','christmas island','cocos (keeling) islands','colombia','comoros','cook islands','costa rica','croatia','cuba','curaçao','cyprus','czechia','côte d’ivoire','democratic republic of the congo','denmark','djibouti','dominica','dominican republic','ecuador','egypt','el salvador','equatorial guinea','eritrea','estonia','ethiopia','falkland islands','faroe islands','fiji','finland','france','french guiana','french polynesia','french southern territories','gabon','gambia','georgia','germany','ghana','gibraltar','greece','greenland','grenada','guadeloupe','guam','guatemala','guernsey','guinea','guinea-bissau','guyana','haiti','heard island and mcdonald islands','honduras','hong kong','hungary','iceland','india','indonesia','iran','iraq','ireland','isle of man','israel','italy','ivory coast','jamaica','japan','jersey','jordan','kazakhstan','kenya','kiribati','kosovo','kuwait','kyrgyzstan','laos','latvia','lebanon','lesotho','liberia','libya','liechtenstein','lithuania','luxembourg','macau','macedonia','madagascar','malawi','malaysia','maldives','mali','malta','marshall islands','martinique','mauritania','mauritius','mayotte','mexico','micronesia','moldova','monaco','mongolia','montenegro','montserrat','morocco','mozambique','myanmar','namibia','nauru','nepal','netherlands','netherlands antilles','new caledonia','new zealand','nicaragua','niger','nigeria','niue','norfolk island','north korea','northern mariana islands','norway','oman','pakistan','palau','palestine','panama','papua new guinea','paraguay','peru','philippines','pitcairn','poland','portugal','puerto rico','qatar','republic of the congo','romania','russia','rwanda','réunion','saint barthélemy','saint helena','saint kitts and nevis','saint lucia','saint martin','saint pierre and miquelon','saint vincent and the grenadines','samoa','san marino','saudi arabia','senegal','serbia','seychelles','sierra leone','singapore','sint maarten','slovakia','slovenia','solomon islands','somalia','south africa','south georgia and the south sandwich islands','south korea','south sudan','spain','sri lanka','sudan','suriname','svalbard and jan mayen','swaziland','sweden','switzerland','syria','são tomé and príncipe','taiwan','tajikistan','tanzania','thailand','timor-leste','togo','tokelau','tonga','trinidad and tobago','tunisia','turkey','turkmenistan','turks and caicos islands','tuvalu','u.s. virgin islands','uganda','ukraine','united arab emirates','united kingdom','united states','united states minor outlying islands']
    
    let lang = localStorage.getItem('language')
    switch ( lang ) {
        case 'es': lang = 'spain'; break;
        case 'us': lang = 'united kingdom'; break;
        case 'fr': lang = 'france'; break;
        case 'de': lang = 'germany'; break;
        case 'it': lang = 'italy'; break;
        case 'nl': lang = 'netherlands'; break;
        case 'ae': lang = 'switzerland'; break;
        case 'ie': lang = 'ireland'; break;
        default: lang = 'united kingdom'; break;

    }

    const [countrySelected, setCountrySelected] = useState(lang)


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

    const setCountries = useCallback( ( countrie=null ) => {
       
        let elementCountries = document.getElementById('countries-box')
        let elementInputCountry = document.getElementById('country')
        

        if( countrie !== null ){
            
            // busca en el array los pais que mas coincida con el texto ingresado "countrie"
            let country = countries.find( ( country ) => {
                return country.toLowerCase().includes( countrie.toLowerCase() )
            })

            // si no encuentra ningun pais, se le asigna el pais por defecto
            if( country === undefined ){
                elementCountries.classList.add('d-none')
                elementCountries.classList.add('country-animate-loading')
                country = ''
            }

            else {
                elementCountries.classList.remove('d-none')
                elementCountries.classList.remove('country-animate-loading')
                elementCountries.innerHTML = country
            }

            localStorage.setItem('countrie', JSON.stringify(country))
            setCountrySelected( country )

        }

        else if( countrie === null ){
            elementCountries.innerHTML = ''
            elementCountries.classList.add('d-none')
            elementCountries.classList.add('country-animate-loading')
            elementInputCountry.value = elementCountries.innerHTML
        }

    }, [countrySelected])

    const validateSearch = ( search ) => {
            
        let regex = null

        switch ( option ) {
            case 'name': regex = /^.{6,}$/ 
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

        if( searchTypeEval === 'name' && countrySelected === null )
            toast.warning(language_toast.empty_country_error_message)
        else if( search === null || search === '' ) 
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
                    window.location.replace(`${extension}/search`)
                }
                else{
                    window.location.replace('/search')
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
                
                { searchTypeEval === 'name' ? 

                    (<>
                        <input type="text" name="search" id="search" className="shearching-input form-control mb-1" placeholder={textHolder} onChange={changeInput} autoFocus />

                        <div className="text-center d-flex flex-column my-2">
                            
                            { language.select_country }
                            
                            <FaGlobe className="fs-1 mx-2 globle-animate-icon-contry-select" 
                            style={{position: 'absolute', left: '25px'}} />

                            <input type="text" name="country" id="country" style={{color: '#645F88', background: '#f7f6fc'}} className="form-control w-25 m-auto my-2 h-25 py-1 text-center" onKeyDown={( e ) =>{
                                setCountries( e.target.value )
                            }} placeholder={ countrySelected } />

                            <div className="countries-box d-flex d-none w-25 m-auto justify-content-center border bg-warning my-2 text-white" id="countries-box" onClick={
                                (e) => {
                                    setCountries()
                                }
                            }>
                                { countrySelected }
                            </div>
                            
                        </div>



                    </>)


                     : <input type="text" name="search" id="search" className="shearching-input form-control" placeholder={textHolder} onChange={changeInput} autoFocus />
                }
                

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
'use client'
import { useState, useEffect, useContext } from "react"
import GlobalContext from "../context/GlobalContext"
import './css/tefpay-payment-form.css'
import Image from 'next/image'
import sha1 from 'js-sha1'
import { FaUser, FaLock } from 'react-icons/fa'

const merchantCode = process.env.NEXT_PUBLIC_TEFPAY_PRODUCTION_MERCHANT_CODE
const merchantSharedkey = process.env.NEXT_PUBLIC_TEFPAY_PRODUCTION_PASSWORD
const merchantUrl = process.env.NEXT_PUBLIC_TEFPAY_TESTS_MERCHAT_URL
const iframe_url = process.env.NEXT_PUBLIC_TEFPAY_TESTS_IFRAME_URL
const iframe_configure_url = process.env.NEXT_PUBLIC_TEFPAY_TESTS_CONFIGURE_URL
const trial_amount = process.env.NEXT_PUBLIC_TEFPAY_TRIAL_AMOUNT
const suscription_amount = process.env.NEXT_PUBLIC_SUSCRIPTION_AMOUNT
const path_endpoint = process.env.NEXT_PUBLIC_PATH_END_POINT
const tefpay_notyfi_url = process.env.NEXT_PUBLIC_TEFPAY_NOTYFI_URL


const CreatePaymentToken = async ( payment_id, user_email ) => {

    try{

        // Fetch to endpoint for get payment
        const req = await fetch( path_endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "petition" : {
                    "name": "create_payment_token",
                    "data": {
                        "create_payment_token": {
                            "payment_id": payment_id,
                            "user_email": user_email
                        }
                    }
                }
            })
        })

        const res = await req.json()
        return res

    } catch ( error ) {
        return error
        //return false
    }

}

// Componente para obtener el formulario de pago de Tefpay
export const TefpayPaymentForm = () => {

    const context = useContext( GlobalContext )
    const { state } = context

    const user = JSON.parse(localStorage.getItem('user'))
    const hostname = window.location.hostname 
    const extension = localStorage.getItem('extencion')
    
    const [ matching_data, setMatchingData ] = useState('')
    const [ signature, setSignature ] = useState('')
    const [ paymentId, setPaymentId ] = useState('')
    const [ paymentToken, setPaymentToken ] = useState('')
    const [ payment_description, setPaymentDescription ] = useState('')
    const [ suscription_account, setSuscriptionAccount ] = useState('')
    const [ suscription_description, setSuscriptionDescription ] = useState('')
    const [ user_name, setUserName ] = useState(localStorage.getItem('user_name'))
    const [ user_email, setUserEmail ] = useState(user.email)

    // TODO: Validar el lenguaje enviamos a Tefpay correctamente
    const [lang, setLang] = useState(localStorage.getItem('language'))

    const [language, setLanguage] = useState( JSON.parse( localStorage.getItem('language_file') ).payment )
    const [dsmerchant_terminal, setDsMerchantTerminal] = useState('00000001')
    const [dsmerchant_terminalauth, setDsMerchantTerminalAuth] = useState('00000001')

    const CleanStringForTefpay = ( email ) => {
    
        email = email.replace(/[ÁÉÍÓÚÜÑáéíóúàèìòùÀÈÍÒÙüñ]/g, function( match ) {
            const replacements = {'Á': 'A','É': 'E','Í': 'I','Ó': 'O','Ú': 'U','Ü': 'U','Ñ': 'N','á': 'a','é': 'e','í': 'i','ó': 'o','ú': 'u','à': 'a','è': 'e','ì': 'i','ò': 'o','ù': 'u','À': 'A','È': 'E','Ì': 'I','Ò': 'O','Ù': 'U','ü': 'u','ñ': 'n'}
            return replacements[ match ]
        })
    
        return email

    }

    const CreateSubscriptionSignature = (
        merchantSharedkey, 
        merchantCode, 
        amount, 
        matchingData, 
        CallbackUrl = ""
    ) => {
        const buffer = amount + merchantCode + matchingData + CallbackUrl + merchantSharedkey
        const result = sha1( buffer )
        return result
    }

    const handle_user_name = ( value ) => {
        setUserName(value)
        return value
    }

    useEffect(() => {
        setLanguage( JSON.parse( localStorage.getItem('language_file') ).payment )
    }, [state])

    useEffect(() =>{

        const merchant_lang = localStorage.getItem('language')  
        const matchingData = String(new Date().toISOString().replace(/[^0-9]/g, '')).padEnd(21, '0')
        const merchantURL = tefpay_notyfi_url
        const signature = CreateSubscriptionSignature(
            merchantSharedkey,
            merchantCode,
            trial_amount,
            matchingData,
            merchantURL
        )

        setPaymentToken(`${matchingData}-${signature}`)
        setLang( merchant_lang )
        setSignature( signature )
        setMatchingData( matchingData )
        setSuscriptionAccount( matchingData )
        setPaymentId( matchingData )
        setUserEmail( user.email )

        // setPaymentDescription( `
        //     NEW PAYMENT - ( Find-persons ) : ${ hostname }
        //     Payment ID: ${ matchingData }
        //     Country: ${ merchant_lang }
        //     User: ${ user_name }
        //     Email: ${ user_email }
        //     Amount: 0.60 EUR
        // `)

        setPaymentDescription( `NEW PAYMENT - ( Find-persons ) `)
        
        // setSuscriptionDescription(`
        //     NEW SUSCRIPTION - ( Find-persons ) : ${ hostname }
        //     Payment ID: ${ matchingData }
        //     Country: ${ merchant_lang }
        //     User: ${ user_name }
        //     Email: ${ user_email }
        //     Amount: 49.90 EUR 
        // `)

        setSuscriptionDescription(`NEW SUSCRIPTION - ( Find-persons ) `)

        let paymentToken = `${matchingData}-${signature}`
        CreatePaymentToken( paymentToken, user.email).then( res => {
            console.log(res)
            if( !res ){
                
                paymentToken = ''
                if( extension !== '' ){
                    window.location.replace(`${extension}/tefpay_error/error_create_payment_token`)
                }

                else {
                    window.location.replace(`/tefpay_error/error_create_payment_token`)
                }

                return false

            }

        } )

    }, [])

    useEffect(() => {
        
        const src = iframe_url
        const script = document.createElement( 'script' )
        
        script.src = src
        script.async = true

        if ( extension === '/' ) {
            setDsMerchantTerminal('00000001')
            setDsMerchantTerminalAuth('00000001')
        }

        else if( extension === '/it' ) {
            setDsMerchantTerminal('00000002')
            setDsMerchantTerminalAuth('00000002')
        }

        else if( extension === '/fr' ) {
            setDsMerchantTerminal('00000003')
            setDsMerchantTerminalAuth('00000003')
        }

        else if( extension === '/at' ) {
            setLang('at')
            setDsMerchantTerminal('00000004')
            setDsMerchantTerminalAuth('00000004')
        }

        else if( extension === '/de' ) {
            setDsMerchantTerminal('00000005')
            setDsMerchantTerminalAuth('00000005')
        }

        else if( extension === '/nl' ) {
            setDsMerchantTerminal('00000006')
            setDsMerchantTerminalAuth('00000006')
        }

        else if( extension === '/be' ) {
            setLang('be')
            setDsMerchantTerminal('00000007')
            setDsMerchantTerminalAuth('00000007')
        }

        else if( extension === '/ae' ) {
            setDsMerchantTerminal('00000008')
            setDsMerchantTerminalAuth('00000008')
        }

        document.body.appendChild( script ).onload = () => {
       
            const TefpayIframe = window.TefpayIframe 
            if( TefpayIframe ) {
                if( TefpayIframe.init() ) {
                    TefpayIframe.configure(iframe_configure_url, "100%")
                    TefpayIframe.load()  
                }
            }

        }

        return () => {
            window.TefpayIframe = null
        }

    }, [])

    return (<>

        <form className="p-2 mb-2 payment-form" role="form" id="tefpayData" autoComplete="true" >

            <input type="hidden" name="Ds_Merchant_TransactionType" value="6"/>
            <input type="hidden" name="Ds_Merchant_Subscription_ProcessingMethod" value="201"/>
            <input type="hidden" name="Ds_Merchant_Subscription_Action" value="C"/>
            <input type="hidden" name="Ds_Merchant_Currency" value="978"/>
            <input type="hidden" name="Ds_Merchant_Amount" value={ trial_amount } />
            <input type="hidden" name="Ds_Merchant_Subscription_ChargeAmount" value={ suscription_amount } />
            <input type="hidden" name="Ds_Merchant_Subscription_RelFirstCharge" value="02D"/>
            <input type="hidden" name="Ds_Merchant_Subscription_PeriodType" value="M"/>
            <input type="hidden" name="Ds_Merchant_Subscription_PeriodInterval" value="1"/>
            <input type="hidden" name="Ds_Merchant_Terminal" value={dsmerchant_terminal}/>
            <input type="hidden" name="Ds_Merchant_TerminalAuth" value={dsmerchant_terminalauth}/>
            <input type="hidden" name="Ds_Merchant_Subscription_Iteration" value="0"/>
            <input type="hidden" name="Ds_Merchant_Url" value={ tefpay_notyfi_url } />
            <input type="hidden" name="Ds_Merchant_UrlOK" value={ `https://${hostname}/api/thanks/${paymentToken}-${lang}-${user_email}-${user_name}-${user.uid}`} />
            <input type="hidden" name="Ds_Merchant_UrlKO" value={ `https://${hostname}${(extension !== '/' ? extension: '' )}/tefpay_error/error` } />
            <input type="hidden" name="Ds_Merchant_MerchantCode" value={merchantCode} />
            <input type="hidden" name="Ds_Merchant_MerchantCodeTemplate" value="V99000566" />
            <input type="hidden" name="Ds_Merchant_TemplateNumber" value="07" />
            <input type="hidden" name="Ds_Merchant_AdditionalData" value="1" />
            <input type="hidden" name="Ds_Merchant_MatchingData" id="Ds_Merchant_MatchingData"  value={ matching_data } />
            <input type="hidden" name="Ds_Merchant_MerchantSignature" id="Ds_Merchant_MerchantSignature"  value={ signature } />
            <input type="hidden" name="Ds_Merchant_Subscription_Account" id="Ds_Merchant_Subscription_Account" value={ suscription_account } />
            <input type="hidden" name="Ds_Merchant_Subscription_ClientName" id="Ds_Merchant_Subscription_ClientName" value={ user_name } />
            <input type="hidden" name="Ds_Merchant_Subscription_ClientEmail" id="Ds_Merchant_Subscription_ClientEmail" value={ (CleanStringForTefpay( user_email )) } />
            <input type="hidden" name="Ds_Merchant_Subscription_Description" value={ suscription_description } />
            <input type="hidden" name="Ds_Merchant_Description" value={ payment_description } />
            <input type="hidden" name="Ds_Merchant_Subscription_NotifyCostumerByEmail" value="0" />
            <input type="hidden" name="Ds_Merchant_Lang" value={ lang } />
            <input type="hidden" id="Ds_Merchant_Subscription_Enable" name="Ds_Merchant_Subscription_Enable" value="1" />

            <div className="form-group ">
                <div className="input-icon">
                    <FaUser />
                    <input
                        type="text"
                        className="form-control"
                        name="user_name"
                        id="user_name"
                        value={ user_name }
                        placeholder={ language.name_placeholder }
                        onChange={ e => setUserName( e.target.value ) }
                        required
                    />
                </div>
                <small className="my-1 px-2 text-secondary">
                    { language.name_help }
                </small>
            </div>

            <div id="tefpayBox"></div>
           
            <div className="form-group  text-center">

                <div className="bg-white rounded shadow p-2 pb-3 my-2 mb-3">
                    <h2 className="my-3 title-section">
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
                    </p>
                </div>
                <br />

                <div className="cards-images my-2">
                    
                    <Image 
                        src="/tefpay_resources/img/07V99000544/icon_visa.png" 
                        alt="visa" 
                        className="img-fluid " 
                        width={50} 
                        height={50} 
                    />

                    <Image 
                        src="/tefpay_resources/img/07V99000544/icon_mastercard.png" 
                        alt="mastercard" 
                        className="img-fluid mx-3" 
                        width={50} 
                        height={50} 
                    />

                    <Image 
                        src="/tefpay_resources/img/07V99000544/icon_jcb.png" 
                        alt="jbc" 
                        className="img-fluid" 
                        width={50} 
                        height={50} 
                    />

                </div>

                <b className="info-cards title-section text-dark ">
                    {language.cards_accept}
                    <span className="marked">
                    {language.secure_3ds}
                    .</span>
                </b><br/>

                <small className="text-secondary">
                    {language.accept_terms}
                </small>

            </div> 

        </form>   

    </>)

}

export default TefpayPaymentForm
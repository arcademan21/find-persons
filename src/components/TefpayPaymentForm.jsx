'use client'
import { useState, useEffect, useContext } from "react"
import GlobalContext from "../context/GlobalContext"
import './css/tefpay-payment-form.css'
import Image from 'next/image'
import sha1 from 'js-sha1'

const merchantCode = process.env.NEXT_PUBLIC_TEFPAY_TESTS_MERCHANT_CODE
const merchantSharedkey = process.env.NEXT_PUBLIC_TEFPAY_TESTS_PASSWORD
const merchantUrl = process.env.NEXT_PUBLIC_TEFPAY_TESTS_MERCHAT_URL
const iframe_url = process.env.NEXT_PUBLIC_TEFPAY_TESTS_IFRAME_URL
const iframe_configure_url = process.env.NEXT_PUBLIC_TEFPAY_TESTS_CONFIGURE_URL
const trial_amount = process.env.NEXT_PUBLIC_TEFPAY_TRIAL_AMOUNT
const suscription_amount = process.env.NEXT_PUBLIC_SUSCRIPTION_AMOUNT
const path_endpoint = process.env.NEXT_PUBLIC_PATH_END_POINT
const tefpay_notyfi_url = process.env.NEXT_PUBLIC_TEFPAY_NOTYFI_URL



// Componente para obtener el formulario de pago de Tefpay
export const TefpayPaymentForm = () => {

    const context = useContext( GlobalContext )
    const { state } = context
    const user = state.user
    
    const hostname = window.location.hostname 
    const lang = window.localStorage.getItem('language')

    const [ matching_data, setMatchingData ] = useState('')
    const [ signature, setSignature ] = useState('')
    const [ paymentId, setPaymentId ] = useState('')
    const [ payment_description, setPaymentDescription ] = useState('')
    const [ suscription_account, setSuscriptionAccount ] = useState('')
    const [ suscription_description, setSuscriptionDescription ] = useState('')
    const [ user_name, setUserName ] = useState('')
    const [ user_email, setUserEmail ] = useState('test@test.com')
    const [ search, setSearch ] = useState('')
    const [ iframe, setIframe ] = useState('')
    const [ language, setLanguage ] = useState( JSON.parse( localStorage.getItem('language_file') ).payment )
    
    const CleanStringForTefpay = ( { email } ) => {
    
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

    const CreateTemporalToken = ( signature ) =>{
        localStorage.setItem('tefpay_token', signature)
    }

    useEffect(() => {
        setLanguage( JSON.parse( localStorage.getItem('language_file') ).payment )
    }, [state])

    useEffect(() =>{

        const matchingData = String(new Date().toISOString().replace(/[^0-9]/g, '')).padEnd(21, '0')
        const merchantURL = merchantUrl
        const signature = CreateSubscriptionSignature(
            merchantSharedkey,
            merchantCode,
            trial_amount,
            matchingData,
            merchantURL
        )
        
        setSignature( signature )
        setMatchingData( matchingData )
        setSuscriptionAccount( matchingData )
        setPaymentId( matchingData )

        CreateTemporalToken( signature )
        
        setPaymentDescription( `
            NEW PAYMENT - ( Find-persons ) : ${ hostname }
            Payment ID: ${ matchingData }
            Country: ${ lang }
            User: ${ user_name }
            Email: ${ user_email }
            Amount: 0.60 EUR
        `)
        
        setSuscriptionDescription(`
            NEW SUSCRIPTION - ( Find-persons ) : ${ hostname }
            Payment ID: ${ matchingData }
            Country: ${ lang }
            User: ${ user_name }
            Email: ${ user_email }
            Amount: 49.90 EUR
        `)

    }, [])

    useEffect(() => {
        
        const src = iframe_url
        const script = document.createElement( 'script' )
        
        script.src = src
        script.async = true
        
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
            <input type="hidden" name="Ds_Merchant_Subscription_Iteration" value="0"/>
            <input type="hidden" name="Ds_Merchant_Url" value={tefpay_notyfi_url} />
            <input type="hidden" name="Ds_Merchant_UrlOK" value={`https://${hostname}/thanks/${paymentId}`} />
            <input type="hidden" name="Ds_Merchant_UrlKO" value={`https://${hostname}/payment/tefpay_error`} />
            <input type="hidden" name="Ds_Merchant_MerchantCode" value="V99000566" />
            <input type="hidden" name="Ds_Merchant_MerchantCodeTemplate" value="V99000566" />
            <input type="hidden" name="Ds_Merchant_TemplateNumber" value="07" />
            <input type="hidden" name="Ds_Merchant_AdditionalData" value="1" />
            <input type="hidden" name="Ds_Merchant_MatchingData" id="Ds_Merchant_MatchingData"  value={ matching_data } />
            <input type="hidden" name="Ds_Merchant_MerchantSignature" id="Ds_Merchant_MerchantSignature"  value={ signature } />
            <input type="hidden" name="Ds_Merchant_Subscription_Account" id="Ds_Merchant_Subscription_Account" value={ suscription_account } />
            <input type="hidden" name="Ds_Merchant_Subscription_ClientName" id="Ds_Merchant_Subscription_ClientName" value={ user_name } onChange={(e) => setUserName(e.target.value)} />
            <input type="hidden" name="Ds_Merchant_Subscription_ClientEmail" id="Ds_Merchant_Subscription_ClientEmail" value={()=>CleanStringForTefpay({ email: user_email })} />
            <input type="hidden" name="Ds_Merchant_Subscription_Description" value={suscription_description} />
            <input type="hidden" name="Ds_Merchant_Description" value={payment_description} />
            <input type="hidden" name="Ds_Merchant_Subscription_NotifyCostumerByEmail" value="0" />
            <input type="hidden" name="Ds_Merchant_Lang" value={ lang } />
            <input type="hidden" id="Ds_Merchant_Subscription_Enable" name="Ds_Merchant_Subscription_Enable" value="1" />

            <div className="form-group ">
                <div className="input-icon">
                    <i className="fas fa-user"></i>
                    <input
                        type="text"
                        className="form-control"
                        name="user_name"
                        id="user_name"
                        placeholder={ language.name_placeholder }
                        value={ user_name } 
                        onChange={ e => setUserName( e.target.value ) }
                    />
                </div>
                <small className="my-1 px-2 text-secondary">
                    { language.name_help }
                </small>
            </div>

            <div id="tefpayBox"></div>
           
            <div className="form-group  text-center">

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
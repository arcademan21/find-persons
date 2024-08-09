'use client'
import Head from 'next/head'
import { useEffect, useState } from 'react'

const RightForGotem = () => {

    const [sendSessionErrorMessage, setSendSessionErrorMessage] = useState( null )
    const [sendFormErrorMessage, setSendFormErrorMessage] = useState( null )
    const [sendFormSuccessMessage, setSendFormSuccessMessage] = useState( null )

    const language = JSON.parse(localStorage.getItem('language_file')).right_for_gotem

    const sendForGotemForm = async ( e ) => {
    
        e.preventDefault()
    
        try {
            const req = await fetch( process.env.NEXT_PUBLIC_PATH_END_POINT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "petition" : {
                        "name": "create_right_to_beforgotten",
                        "data": {
                            "create_right_to_beforgotten": {
                                "user_email": user.email,
                                "phone": document.getElementById('phone').value,
                                "forgotem_name": document.getElementById('forgotem-name').value,
                                "forgotem_email": document.getElementById('forgotem-email').value,
                                "forgotem_phone": document.getElementById('forgotem-phone').value,
                                "forgotem_address": document.getElementById('forgotem-address').value
                            }
                        }
                    }
                })
            })
    
            const res = await req.json()
            
            if( res.status === 'error') {
                
                setSendFormErrorMessage(message_error)
                return false
            }
            
            setSendFormSuccessMessage(mesage_success)
            return res
    
        } 
        
        catch ( error ) {
            return false
        }
    
       
    
    }

    useEffect(()=>{

        const user = JSON.parse( localStorage.getItem('user') )
   
        if ( !user ) {
            setSendSessionErrorMessage(language.you_must)
        }


    }, [sendSessionErrorMessage])

    return (<>

        <Head>
            <meta name="robots" content="noindex" />
        </Head>

        <div className="container py-5">
            
            <div className="page-banner my-5">
                <div className="row justify-content-center align-items-center h-100">
                    <div className="col-md-6">
                        <h1 className="text-center">
                            {language.title}
                        </h1>
                    </div>
                </div>
            </div>

            <main className='vh-100'>

                <div className="page-section pt-0">
                    <div className="container">
                    <div className="row align-items-center">
                        
                        { sendSessionErrorMessage && <div className="alert alert-danger">{ sendSessionErrorMessage }</div> }
                        { sendFormErrorMessage && <div className="alert alert-danger">{ sendFormErrorMessage }</div> }
                        { sendFormSuccessMessage && <div className="alert alert-success">{ sendFormSuccessMessage }</div> }

                        <div className="col-md-6 m-auto">

                            <div className="card vh-100 mb-5">

                                <div className="card-body">

                                    <form onSubmit={e=>{
                                        sendForGotemForm( e )
                                    }} method="post" className="form">
                            
    
                                            <div className="form-group">
                                                <label htmlFor="phone">{language.phone}</label>
                                                <input type="text" name="phone" id="ohone" className="form-control rounded border my-2" required />
                                            </div>

                                            <div className='divider w-75 m-auto my-3'></div>

                                            <h3 className='m-auto'>
                                                {language.title_2}
                                            </h3>
                                            <div className="form-group">
                                                <label htmlFor="name">
                                                    {language.name}
                                                </label>
                                                <input type="text" name="forgotem-name" id="forgotem-name" className="form-control rounded border my-2" required />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="email">
                                                    {language.email}
                                                </label>
                                                <input type="email" name="forgotem-email" id="forgotem-email" className="form-control rounded border my-2" required />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="phone">
                                                    {language.phone}
                                                </label>
                                                <input type="text" name="forgotem-phone" id="forgotem-phone" className="form-control rounded border my-2" required />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="address">
                                                    {language.address}
                                                </label>
                                                <input type="text" name="forgotem-address" id="forgotem-address" className="form-control rounded border my-2" required />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="message">
                                                    {language.message}
                                                </label>
                                                <textarea name="message" id="reason" className="form-control rounded border my-2" required></textarea>
                                            </div>

                                            <p>
                                                <small>
                                                <strong>{language.note}</strong> 
                                                    {language.text_note_1}
                                                    <br />
                                                    {language.text_note_2}
                                                </small>
                                            </p>

                            
                                            <button type="submit" className="btn btn-secondary">
                                                {language.send}
                                            </button>

                                        </form>

                                </div>

                            </div>


                        </div>










                    </div>
                    </div>
                </div>

                        


            </main>


        </div>
    </>)

}

export default RightForGotem
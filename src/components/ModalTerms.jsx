'use client'
import { useEffect } from "react";
import Link from 'next/link'
import {toast} from 'react-toastify'

const ModalTerms = () => {

    const language = JSON.parse(localStorage.getItem('language_file')).modal_terms
    const lang = localStorage.getItem('language')

    const handle_terms = (e) => {
        if( e.target.checked ) document.getElementById('acceptBtn').removeAttribute('disabled')
        else document.getElementById('acceptBtn').setAttribute('disabled', true)
    }

    const message_terms_error = () => {
        toast.error(language.error_terms_message)
        return false
    }

    const handle_acept_terms = (e) => {
        const terms_box = document.getElementById('termsCheck')

        if( e.target.getAttribute('disabled') ) {
            terms_box.checked = false
            return message_terms_error()
        }

        if( terms_box.checked ) {
            document.getElementById('termsModal').remove()
        }

        else {
            return message_terms_error()
        }

    }               

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const { Modal } = require('bootstrap')
            const myModal = document.getElementById('termsModal')
            const modal = new Modal(myModal, {
                backdrop: 'static'
            })
            modal.show()
        }
    }, [])
    
    return (
        <div className="modal fade pt-4 modal-lg" id="termsModal" tabindex="-1" role="dialog" aria-labelledby="termsModalLabel" aria-hidden="true">

            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    
                    <div className="modal-header">
                        <h5 className="modal-title" id="termsModalLabel">
                            {language.title}
                        </h5>
                    </div>

                    
                    
                    <div className="modal-body">
                        
                        <p>
                            {language.paragraph_1}
                        </p>

                        <p>
                            {language.paragraph_2}
                        </p>
                
                        <p>
                            {language.paragraph_3}
                        </p>
                
                        <p>
                            {language.paragraph_4}
                        </p>
                
                        <p>
                            {language.paragraph_5}
                        </p>

                    </div>
                    
                    <div className="modal-footer justify-content-center">
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="termsCheck" onChange={handle_terms} />
                            <label className="form-check-label ml-4" for="termsCheck">
                                <Link href={`${lang}/terms`}>
                                    {language.checkbox}
                                </Link>
                            </label>
                        </div>
                        <button type="button" className="btn btn-primary" data-dismiss="modal" id="acceptBtn" onClick={handle_acept_terms}
                        disabled>
                            {language.button}
                        </button>
                    </div>

                </div>
                
            </div>

        </div>
    )

}

export default ModalTerms;


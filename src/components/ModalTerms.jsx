'use client'
import { useEffect } from "react"
import {toast} from 'react-toastify'

const ModalTerms = () => {

    const language = JSON.parse(localStorage.getItem('language_file')).modal_terms
    let lang = localStorage.getItem('languageI18')

    if( lang === 'es' ) lang = ''

    const handle_change_terms_box = ( e ) => {
        const error_message = document.querySelector('.error_message')
        if( e.currentTarget.checked ) {
            e.currentTarget.style.borderColor = 'initial'
            error_message.classList.add('d-none')
        }
    }

    const handle_acept_terms = () => {
        
        const terms_box = document.getElementById('termsCheck')
        const error_message = document.querySelector('.error_message')

        if( terms_box.checked ) {
            const { Modal } = require('bootstrap')
            const myModal = document.getElementById('termsModal')
            const modal = Modal.getInstance(myModal)
            error_message.classList.add('d-none')
            modal.hide()
        }

        else {
            terms_box.style.borderColor = 'red'
            error_message.classList.remove('d-none')
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
        <div className="modal fade pt-4" id="termsModal" tabindex="-1" role="dialog" aria-labelledby="termsModalLabel" aria-hidden="true">

            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    
                    <div className="modal-header">
                        <h5 className="modal-title" id="termsModalLabel">
                            {language.title}
                        </h5>
                    </div>

                    <div className="modal-body" style={{maxHeight: '520px', overflow: 'scroll'}}>
                        
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
                            <input type="checkbox" className="form-check-input" id="termsCheck" onChange={(e)=>handle_change_terms_box(e)} 
                                style={{ 
                                    borderStyle: 'double',
                                    borderWidth: '3px',
                                    borderColor: '#615e5e',
                                    transform: 'scale(1.3)'
                                 }}
                            />
                            <label className="form-check-label ml-4" for="termsCheck" style={{ fontFamily: 'sans-serif',
                            fontWeight: '300' }}>
                                {language.checkbox}
                            </label>
                            <small className="d-none text-danger error_message">
                                {language.error_terms_message}
                            </small>
                        </div>
                        <button type="button" className="btn btn-primary" data-dismiss="modal" id="acceptBtn" onClick={handle_acept_terms} >
                            { language.button }
                        </button>
                    </div>

                </div>
                
            </div>

        </div>
    )

}

export default ModalTerms;


'use client'
import { useEffect } from "react";

const ModalTerms = () => {

    const language = JSON.parse(localStorage.getItem('language_file')).modal_terms

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const { Modal } = require('bootstrap')
            const myModal = document.getElementById('termsModal')
            const modal = new Modal(myModal)
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
                    
                    <div className="modal-footer">
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="termsCheck" onChange={(e) => {
                                if( e.target.checked ) document.getElementById('acceptBtn').removeAttribute('disabled')
                                else document.getElementById('acceptBtn').setAttribute('disabled', true)
                            }} />
                            <label className="form-check-label ml-4" for="termsCheck">
                                {language.checkbox}
                            </label>
                        </div>
                        <button type="button" className="btn btn-primary" data-dismiss="modal" id="acceptBtn" disabled>
                            {language.button}
                        </button>
                    </div>

                </div>
                
            </div>

        </div>
    )

}

export default ModalTerms;


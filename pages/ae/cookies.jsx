'use client'
import Head from 'next/head'
import { FaSquare }
from 'react-icons/fa'

const host_name = process.env.NEXT_PUBLIC_HOST_NAME

const Cookies = () => {

    const language = JSON.parse(localStorage.getItem('language_file')).cookies
    const extension = localStorage.getItem('extencion')

    return (<>

        <Head>
            <meta name="robots" content="noindex" />
        </Head>

        <div className="container py-5">
            
            <div className="page-banner my-5">
                <div className="row justify-content-center align-items-center h-100">
                    <div className="col-md-6">
                    <h1 className="text-center">
                        {language.title_1}
                    </h1>
                    </div>
                </div>
            </div>

            <main>
                <div className="page-section">
                <div className="container">
                    <div className="row align-items-center">
                    <div className="col-lg-12 py-3">
                        <p>{language.paragraph_1}</p>

                        

                        <h2 className="title-section"> {language.title_2} </h2>
                        <div className="divider"></div>
                        <p>{language.paragraph_2}</p>

                        <h2 className="title-section"> {language.title_3} </h2>
                        <div className="divider"></div>
                        <p>{language.paragraph_3} {host_name} </p>
                        <p>{language.paragraph_4} </p>

                        <ul>
                            <li>
                                <FaSquare className='mx-2' />
                                {language.list_item_1}
                            </li>
                            <li>
                                <FaSquare className='mx-2' />
                                {language.list_item_2}
                            </li>
                        </ul>

                        <h3> {language.title_4} </h3>
                        <ul>
                            <li>
                                <FaSquare className='mx-2' />
                                {language.list_item_3}
                            </li>
                            <li>
                                <FaSquare className='mx-2' />
                                {language.list_item_4}
                            </li>
                            <li>
                                <FaSquare className='mx-2' />
                                {language.list_item_5}
                            </li>
                        </ul>

                        <h3>
                            {language.title_5}
                        </h3>
                        <ul>
                            <li>
                                <FaSquare className='mx-2' />
                                {language.list_item_6}
                            </li>
                            <li>
                                <FaSquare className='mx-2' />
                                {language.list_item_7}
                            </li>
                        </ul>

                        <h2 className="title-section">{language.title_4}</h2>
                        <div className="divider"></div>
                        <p> {language.paragraph_5} </p>
                        <p> {language.paragraph_6} </p>
                        <ul>
                            <li>

                                <FaSquare className='mx-2' />
                                {language.list_item_8}

                            </li>
                            <li>
                                <FaSquare className='mx-2' />
                                {language.list_item_9}
                            </li>
                        </ul>

                        <p>
                            {language.paragraph_7}
                        </p>

                        <ul>
                            <li>
                                <FaSquare className='mx-2' />
                                {language.list_item_10}
                            </li>
                            <li>
                                <FaSquare className='mx-2' />
                                {language.list_item_11}
                            </li>
                            <li>
                                <FaSquare className='mx-2' />
                                {language.list_item_12}
                            </li>
                        </ul>

                        <h3>{language.title_6}</h3>
                        <br />
                        <p>{ language.paragraph_8 } <br />
                        { language.paragraph_9 } </p>

                        <h2 className="title-section">
                            {language.title_7}
                        </h2>
                        <div className="divider"></div>
                        <p>
                            {language.paragraph_10}
                        </p>
                        <p>
                            {language.paragraph_11}
                        </p>

                        <ul>
                            <li>
                                <FaSquare className='mx-2' />
                                {language.list_item_13}
                            </li>
                            <li>
                                <FaSquare className='mx-2' />
                                {language.list_item_14}
                            </li>
                            <li>
                                <FaSquare className='mx-2' />
                                {language.list_item_15}
                            </li>
                            <li>
                                <FaSquare className='mx-2' />
                                {language.list_item_16}
                            </li>
                            <li>
                                <FaSquare className='mx-2' />
                                {language.list_item_17}
                            </li>
                        </ul>

                        <br />

                        <h2 className="title-section">  
                            {language.title_8}
                        </h2>
                        <div className="divider"></div>
                        <p>
                            {language.paragraph_12}
                        </p>

                        <h2 className="title-section"> 
                            {language.title_9} { process.env.NEXT_PUBLIC_SUPPORT_EMAIL }
                        </h2>
                        <div className="divider"></div>
                        <p>
                            {language.paragraph_13}
                        </p>


                        
                    </div>
                    
                    </div>
                </div>
                </div> 
            </main>


        </div>
    </>)

}

export default Cookies;
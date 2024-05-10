'use client'
import Head from 'next/head';

const Legal = () => {

    const language = JSON.parse(localStorage.getItem('language_file')).legal;

    return (<>

        <Head>
            <meta name="robots" content="noindex" />
        </Head>

        <div className="container py-5">
            
            <div className="page-banner my-5">
                <div className="row justify-content-center align-items-center h-100">
                    <div className="col-md-6">
                    <h1 className="text-center">{language.title_1}</h1>
                    </div>
                </div>
            </div>

            <main>
                <div className="page-section">
                    <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-12 py-3">
                        
                        <h2 className="title-section">{language.title_2}</h2>
                        <div className="divider"></div>
                        <p>
                            {language.paragraph_1}
                        </p>

                        <ul>
                            <li> {language.list_1.item_1}</li>
                            <li> {language.list_1.item_2}</li>
                            <li> {language.list_1.item_3}</li>
                            <li> {language.list_1.item_4}</li>
                            <li> {language.list_1.item_5}</li>
                            <li> {language.list_1.item_6}</li>
                            <li> {language.list_1.item_7}</li>
                        </ul>

                        <br />

                        <h2 className="title-section">{language.title_3}</h2>
                        <div className="divider"></div>

                        <p>
                            { language.paragraph_2 } 
                            <a href={`https://${process.env.NEXT_PUBLIC_HOST_NAME }` } >
                                {process.env.NEXT_PUBLIC_HOST_NAME}
                            </a> 
                            { language.paragraph_2b }
                        </p>  

                        <h2 className="title-section">{language.title_4}</h2>
                        <div className="divider"></div>

                        <p>
                            { language.paragraph_3 }
                        </p>  

                        <ul>
                            <li><a href={`https://${process.env.NEXT_PUBLIC_HOST_NAME }/terms` }>{language.list_2.item_1}</a></li>
                            <li><a href={`https://${process.env.NEXT_PUBLIC_HOST_NAME }/policies` }>{language.list_2.item_2}</a></li>
                            <li><a href={`https://${process.env.NEXT_PUBLIC_HOST_NAME }/cookies` }>{language.list_2.item_3}</a></li>
                        </ul> 

                        <p>{ language.paragraph_4 }</p>
                        <p>{ language.paragraph_5 }</p>
                        <p>{ language.paragraph_6 }</p>
                        <p>{ language.paragraph_7 }</p>

                        <h2 className="title-section">
                            { language.title_5 }
                        </h2>
                        <div className="divider"></div>

                        <p>
                            { language.paragraph_8 }
                        </p>  

                        <p>
                            
                            { language.paragraph_9 }
                            <a href={`https://${process.env.NEXT_PUBLIC_HOST_NAME }/policies` }>
                                {language.paragraph_9b}
                            </a>
                            
                        </p>

                        <h2 className="title-section">
                            {language.title_6}
                        </h2>
                        <div className="divider"></div>

                        <p>
                            {language.paragraph_10}
                            
                        </p>  

                        <h2 className="title-section">
                            {language.title_7}
                        </h2>
                        <div className="divider"></div>

                        <p>
                            {language.paragraph_11}
                        </p>  

                        <p>
                            {language.paragraph_11b}
                        </p>

                        <p>
                            {language.paragraph_12}
                        </p>

                        <p>
                            {language.paragraph_13}
                        </p>

                        <p>
                            {language.paragraph_14}
                        </p>

                        </div>
                        
                    </div>
                    </div> 
                </div> 
            </main>

        </div>
    </>)

}

export default Legal
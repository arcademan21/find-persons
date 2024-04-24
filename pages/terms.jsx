'use client'
import Head from 'next/head';

const Terms = () => {

    const language = JSON.parse(localStorage.getItem('language_file')).terms

    

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
                        
                            <h2 className="title-section"></h2>
                            <div className="divider"></div>

                            <p>
                                {language.paragraph_1}
                                {process.env.NEXT_PUBLIC_HOST_NAME} 
                                {language.paragraph_2}
                                {process.env.NEXT_PUBLIC_HOST_NAME}
                                {language.paragraph_3}
                            </p>

                            <br />
                            
                            {language.paragraph_4}
                            
                            <br />
                            
                            {language.paragraph_5} 
                            {process.env.NEXT_PUBLIC_HOST_NAME} 
                            {language.paragraph_6}
                            
                            <div className="divider"></div>
                            
                            <h2 className="title-section">
                                {language.title_2}
                            </h2>
                            {language.paragraph_7}
                            {process.env.NEXT_PUBLIC_HOST_NAME}
                            {language.paragraph_8}
                            {process.env.NEXT_PUBLIC_HOST_NAME}
                            {language.paragraph_9}
                            
                            <div className="divider"></div>
                            
                            <h2 className="title-section">
                                {language.title_3}
                            </h2>

                            <div className="divider"></div>
                            <h2 className="title-section">
                                {language.title_4}
                            </h2>
                            <p>
                                {language.paragraph_10}
                            </p>
                            <div className="divider"></div>
                            <h2 className="title-section">
                                {language.title_5}
                            </h2>
                            
                            <p>
                                {language.paragraph_11}
                            </p>
                            
                            <div className="divider"></div>
                            <h2 className="title-section">
                                {language.title_6}
                            </h2>
                            
                            <p>
                                {language.paragraph_12}
                            </p>

                            <div className="divider"></div>

                            <h2 className="title-section">
                                {language.title_7}
                            </h2>
                            
                            {language.paragraph_13}

                            <div className="divider"></div>
                            <h2 className="title-section">
                                {language.title_8}
                            </h2>
                            <p>
                                {language.paragraph_14}
                            </p>
                            <div className="divider"></div>
                            <h2 className="title-section">
                                {language.title_9}
                            </h2>
                            <p>
                                {language.paragraph_15}
                            </p>
                            <div className="divider"></div>
                            <h2 className="title-section">
                                {language.title_10}
                            </h2>
                            <p>
                                {language.paragraph_16}
                            </p>
                            <div className="divider"></div>
                            <h2 className="title-section">
                                {language.title_11}
                            </h2>
                            <p>
                                {language.paragraph_17}
                            </p>
                            <div className="divider"></div>
                            <h2 className="title-section">
                                {language.title_12}
                            </h2>
                            <p>
                                {language.paragraph_18}
                            </p>
                            <div className="divider"></div>
                            <h2 className="title-section">
                                {language.title_13}
                            </h2>
                            <p>
                                {language.paragraph_19}
                            </p>
                            <div className="divider"></div>
                            <h2 className="title-section">
                                {language.title_14}
                            </h2>
                            <p>
                                {language.paragraph_20}
                            </p>
                            <div className="divider"></div>
                            <h2 className="title-section">
                                {language.title_15}
                            </h2>
                            <p>
                                {language.paragraph_21}
                            </p>
                            <div className="divider"></div>
                            <h2 className="title-section">
                                {language.title_16}
                            </h2>
                            <p>
                                {language.paragraph_22}
                                {process.env.NEXT_PUBLIC_HOST_NAME}
                                {language.paragraph_22b}
                            </p>
                            
                            <div className="divider"></div>
                            <h2 className="title-section">
                                {language.title_17}
                            </h2>
                            <p>
                                {language.paragraph_23}
                            </p>
                            <div className="divider"></div>
                            <h2 className="title-section">
                                {language.title_18}
                            </h2>
                            <p>
                                {language.paragraph_24}
                                {process.env.NEXT_PUBLIC_SUPPORT_EMAIL} 
                                {language.paragraph_24b}
                            </p>
                            
                        



                
                            
                        </div>
                        
                        </div>
                    </div> 
                </div> 
            </main>


        </div>
    </>)

}

export default Terms
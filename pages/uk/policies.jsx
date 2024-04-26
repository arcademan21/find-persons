'use client'
import Head from 'next/head';

const Policies = () => {

    const language = JSON.parse(localStorage.getItem('language_file')).policies
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
                            <h2 className="title-section">
                                {language.title_2}
                            </h2>
                            <div className="divider"></div>

                            
                        
                            <h3>
                                {language.title_3}
                            </h3>
                            <p>
                                {language.paragraph_1}
                            </p>

                            <h3>
                                {language.title_4}
                            </h3>

                            <p>
                                {language.paragraph_2}
                            </p>

                            <p>
                                {language.paragraph_3}
                            </p>

                            
                            <p>
                                {language.paragraph_4}
                            </p>

                            <h3>
                                {language.title_5}
                            </h3>

                            <p>
                                {language.paragraph_5}
                            </p>

                            <p>
                                {language.paragraph_6}
                            </p>

                            <p>
                                {language.paragraph_7}
                            </p>

                            <p> 
                                {language.paragraph_8}
                            </p>

                            

                            <p> 
                                {language.paragraph_9}
                            </p>

                            <p>
                                {language.paragraph_10}
                            </p>

                            <h3>
                                {language.title_6}
                            </h3>
                            <p>
                                {language.paragraph_11}
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

                            <h3>
                                {language.title_7}
                            </h3>
                            
                            <p>
                                {language.paragraph_15}
                            </p>

                            <p>
                                {language.paragraph_16}
                            </p>

                            <p>
                                {language.paragraph_17}
                            </p>

                            <h3>
                                {language.title_8}
                            </h3>
                            <p>
                                {language.paragraph_18}
                            </p>
                            <p>
                                {language.paragraph_19}
                            </p>

                            <h3>
                                {language.title_9}
                            </h3>

                            <p>
                                {language.paragraph_20}
                            </p>

                            <p>
                                {language.paragraph_21}
                            </p>

                            <ul>
                                <li>
                                    {language.list_item_1}
                                </li>
                                <li>
                                    {language.list_item_2}
                                </li>
                                <li>
                                    {language.list_item_3}
                                </li>
                            </ul>
                            <br />
                            <h3>
                                {language.title_10}
                            </h3>
                            
                            <p>
                                {language.paragraph_22}
                            </p>

                            <ul>
                                <li>
                                    {language.list_item_4}
                                </li>
                                <li>
                                    {language.list_item_5}
                                </li>
                                <li>
                                    {language.list_item_6}
                                </li>
                                <li>
                                    {language.list_item_7}
                                </li>
                                <li>
                                    {language.list_item_8}
                                </li>
                                <li>
                                    {language.list_item_9}
                                </li>
                                <li>
                                    {language.list_item_10}
                                </li>
                                <li>
                                    {language.list_item_11}
                                </li>
                            </ul>

                            <br />

                            <p>
                                {language.paragraph_23}
                                <a href={'/right-forgotem'} >
                                    {language.paragraph_24}
                                </a>
                                {language.paragraph_25}
                                </p>

                            <p>
                                {language.paragraph_26}
                            </p>

                            <p>
                                <ul>
                                    <li><a href={'https://reportcontent.google.com/forms/rtbf'}>Google</a></li>
                                    <li><a href={'https://www.bing.com/webmaster/tools/eu-privacy-request?setlang=es'}>Bing</a></li>
                                    <li><a href={'https://io.help.yahoo.com/contact/index?page=contactform&locale=es_ES&token=Zh%2FBBVqXzLHlIbokbUqVWTUbuuQeXGkGFw6kaYtcsz3bJLmIlI3EUv0z8vEZZIiUaVM%2FeyBEjFUCaMU2WNilF1pt08EKxz55Rcv1x17V0EmPwqCwTMq3EFzwfnJNrIXz0JmkcIODVsGATkR7pX7Nwg%3D%3D&selectedChannel=email-icon&yid='}>Yahoo</a>
                                    </li>
                                </ul>
                            </p>

                            <h3>
                                {language.title_11}
                            </h3>
                            <p>
                                {language.paragraph_27}
                            </p>

                            </div>
                        
                        </div>
                    </div> 
                </div> 
            </main>


        </div>
    </>)

}

export default Policies
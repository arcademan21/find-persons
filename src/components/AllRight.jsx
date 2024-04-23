'use client'
import Head from "next/head"
const AllRight = ( ) => {

    const language = JSON.parse(localStorage.getItem('language_file')).footer
    const year = new Date().getFullYear()

    return (<>

        <Head>
            <meta name="robots" content="noindex" />
        </Head>

        <div className="all-right">
            <p>© {language.all_rights_company} {year} {language.all_rights_reserved}</p>
        </div>
        
    </>)
}

export default AllRight
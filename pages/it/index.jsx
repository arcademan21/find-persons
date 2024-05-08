import Hero from '@/components/Hero'
import HomeSections from '@/components/HomeSections'
import styles from "@/app/css/page.module.css"
import Head from 'next/head'

const Home = () => {
    
    return (<>
        <Head>
            
            {/*  Google tag (gtag.js) ANALYTICS */}
            <script async src="https://www.googletagmanager.com/gtag/js?id=G-98T1FZF36J"></script>
            <script
                dangerouslySetInnerHTML={{
                __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-98T1FZF36J');
                `,
                }}
            />

        </Head>
        <Hero />
        <HomeSections />
    </>)

}

export default Home
import {
    Page,
    Text,
    View,
    Image,
    Document,
    StyleSheet,
    Link
} from '@react-pdf/renderer'


const PdfRenderer = ( { dataPerson } ) => {
    
    const language = JSON.parse(localStorage.getItem('language_file')).results_pdf
    return (
        <Document>
            
            <Page size="A4" style={styles.page}>
                
                <View style={styles.section}>
                    <Text>{language.title}</Text>
                </View>

                <View style={styles.section_row}>

                    {/* Image people */}
                    <View style={styles.section}>
                        <Image style={styles.no_user_image} src={"/images/no_user_image.jpeg"} />
                    </View>

                    {/* Organic results */}
                    <View style={styles.section}>
                        <Text style={styles.title}>
                            {language.title_organic_results}
                        </Text>
                    </View>

                    <View style={styles.section}>
                        
                        <Text style={styles.title}>
                            {language.search_information}
                        </Text>
                        <Text style={styles.text}>
                            {language.total_results} : { dataPerson.response.search_information.total_results }
                        </Text>
                        <Text style={styles.text}>
                            {language.time_taken_displayed} : { dataPerson.response.search_information.time_taken_displayed }
                        </Text>

                    </View>
                    
                    {
                        dataPerson.response.organic_results.map( ( result, index ) => {
                            return <View style={styles.section_row}>
                                <Text style={styles.title}>{result.title}</Text>
                                <Text style={styles.text}>{result.snippet}</Text>
                                <Link src={result.url}>{result.url}</Link>
                            </View>
                        })
                    }


                </View>

            </Page>

        </Document>
    )

}

const styles = StyleSheet.create({
    logo: {
        width: 150,
        height: 50,
        marginBottom: 10,
    },
    page: {
        flexDirection: 'column',
        backgroundColor: '#E4E4E4',
        padding: 10,
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
    },
    section_row: {
        flexDirection: 'row',
        margin: 10,
        padding: 10,
        flexGrow: 1,
    },
    title: {
        fontSize: 20,
        marginBottom: 10,
        fontWeight: 'bold',
    },
    text: {
        fontSize: 12,
        marginBottom: 5,
    },
    no_user_image: {
        width: 150,
        height: 150,
        marginBottom: 10,
    },
})

export default PdfRenderer
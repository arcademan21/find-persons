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

                <Image style={styles.logo} src="/images/logo_find-persons.png" alt="Logo" />
                
                <View style={styles.section}>
                    <Text>{language.title}</Text>
                </View>

                <View style={styles.section_row}>
                    
                    {/* Image people */}
                    <View style={styles.section}>
                        <Image style={styles.no_user_image} src={"/images/no_user_image.jpeg"} alt="No user image" />
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
                </View>

                {/* Organic results */}
                <View style={styles.section}>
                    <Text style={styles.title}>
                        {language.title_organic_results}
                    </Text>
                </View>

                {
                    dataPerson.response.organic_results.map( ( result, index ) => {
                        return (
                            <View style={styles.section} key={index}>
                                <Text style={styles.title}>{result.title}</Text>
                                <Text style={styles.text}>{result.snippet}</Text>
                                <Link src={result.url}>{result.url}</Link>
                            </View>
                        )
                    })
                }

                {/* Inline images */}
                <View style={styles.section}>
                    <Text style={styles.title}>
                        {language.title_inline_images}
                    </Text>
                </View>

                {
                    dataPerson.response.inline_images.map( ( image, index ) => {
                        return (
                            <View style={styles.section} key={index}>
                                <Image src={image.image_url} alt={image.title} />
                            </View>
                        )
                    })
                }

                {/* Related questions */}
                <View style={styles.section}>
                    <Text style={styles.title}>
                        {language.title_related_questions}
                    </Text>
                </View>

                {
                    dataPerson.response.related_questions.map( ( question, index ) => {
                        return (
                            <View style={styles.section} key={index}>
                                <Text style={styles.title}>{question.question}</Text>
                            </View>
                        )
                    })
                }

                {/* Search parameters */}
                <View style={styles.section}>
                    <Text style={styles.title}>
                        {language.title_search_parameters}
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.text}>
                        {language.engine} : {dataPerson.response.search_parameters.engine}
                    </Text>
                    <Text style={styles.text}>
                        {language.type} : {dataPerson.response.search_parameters.type}
                    </Text>
                    <Text style={styles.text}>
                        {language.auto_location} : {dataPerson.response.search_parameters.auto_location}
                    </Text>
                    <Text style={styles.text}>
                        {language.safe} : {dataPerson.response.search_parameters.safe}
                    </Text>
                    <Text style={styles.text}>
                        {language.news_type} : {dataPerson.response.search_parameters.news_type}
                    </Text>
                    <Text style={styles.text}>
                        {language.exclude_autocorrected_results} : {dataPerson.response.search_parameters.exclude_autocorrected_results}
                    </Text>
                    <Text style={styles.text}>
                        {language.images_color} : {dataPerson.response.search_parameters.images_color}
                    </Text>
                    <Text style={styles.text}>
                        {language.page} : {dataPerson.response.search_parameters.page}
                    </Text>
                    <Text style={styles.text}>
                        {language.num} : {dataPerson.response.search_parameters.num}
                    </Text>
                    <Text style={styles.text}>
                        {language.output} : {dataPerson.response.search_parameters.output}
                    </Text>
                    <Text style={styles.text}>
                        {language.csv_fields} : {dataPerson.response.search_parameters.csv_fields}
                    </Text>
                    <Text style={styles.text}>
                        {language.query} : {dataPerson.response.search_parameters.query}
                    </Text>
                    
                    
                </View>

                {/* Search url */}
                <View style={styles.section}>
                    <Text style={styles.title}>
                        {language.title_search_url}
                    </Text>
                </View>

                <View style={styles.section}>
                    <Link src={dataPerson.response.search_url}>{dataPerson.response.search_url}</Link>
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
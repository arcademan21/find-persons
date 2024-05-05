import {
    Page,
    Text,
    View,
    Image,
    Document,
    StyleSheet,
} from '@react-pdf/renderer'



const PdfRenderer = ( { dataPerson } ) => {
    
    const language = JSON.parse(localStorage.getItem('language_file')).results_pdf
    return (
        <Document>
            <Page size="A4" style={styles.page}>
            

                {/* Logo */}
                <View style={styles.section}>
                    <Image style={styles.logo} src="/images/logo_find-persons.png" />
                </View>


                <View style={styles.section_row}>

                    {/* Image people */}
                    <View style={styles.section}>
                        <Image style={styles.no_user_image} src={"/images/no_user_image.jpeg"} />
                    </View>

                    {/* Data contact */}
                    <View style={styles.section}>
                        <Text style={styles.title}>{language.title_contact_data}</Text>
                        <Text style={styles.text}>{language.phone_numbers} : { dataPerson.phone_numbers }</Text>
                        <Text style={styles.text}>{language.emails} : { dataPerson.emails }</Text>
                    </View>


                </View>
                
                <View style={styles.section_row}>
                    {/* Data personal */}
                    <View style={styles.section}>
                        <Text style={styles.title}>{language.title_personal_data}</Text>
                        <Text style={styles.text}>{language.name} : { dataPerson.full_name }</Text>
                        <Text style={styles.text}>{language.sex} : { dataPerson.sex }</Text>
                        <Text style={styles.text}>{language.birth_year} : { dataPerson.birth_year }</Text>
                        <Text style={styles.text}>{language.birth_date} : { dataPerson.birth_date }</Text>
                        <Text style={styles.text}>{language.linkedin_url} : { dataPerson.linkedin_url }</Text>
                        <Text style={styles.text}>{language.linkedin_username} : { dataPerson.linkedin_username }</Text>
                        <Text style={styles.text}>{language.linkedin_id} : { dataPerson.linkedin_id }</Text>
                        <Text style={styles.text}>{language.facebook_url} : { dataPerson.facebook_url }</Text>
                        <Text style={styles.text}>{language.facebook_username} : { dataPerson.facebook_username }</Text>
                        <Text style={styles.text}>{language.facebook_id} : { dataPerson.facebook_id }</Text>
                        <Text style={styles.text}>{language.twitter_url} : { dataPerson.twitter_url }</Text>
                        <Text style={styles.text}>{language.twitter_username} : { dataPerson.twitter_username }</Text>
                        <Text style={styles.text}>{language.github_url} : { dataPerson.github_url }</Text>
                        <Text style={styles.text}>{language.github_username} : { dataPerson.github_username }</Text>
                        <Text style={styles.text}>{language.work_email} : { dataPerson.work_email }</Text>
                        <Text style={styles.text}>{language.personal_emails} : { dataPerson.personal_emails }</Text>
                        <Text style={styles.text}>{language.recommended_personal_email} : { dataPerson.recommended_personal_email }</Text>
                        <Text style={styles.text}>{language.mobile_phone} : { dataPerson.mobile_phone }</Text>
                    </View>

                    {/* Data job */}
                    <View style={styles.section}>
                        <Text style={styles.title}>{language.title_job_data}</Text>
                        <Text style={styles.text}>{language.industry} : { dataPerson.industry }</Text>
                        <Text style={styles.text}>{language.job_title} : { dataPerson.job_title }</Text>
                        <Text style={styles.text}>{language.job_title_role} : { dataPerson.job_title_role }</Text>
                        <Text style={styles.text}>{language.job_title_sub_role} : { dataPerson.job_title_sub_role }</Text>
                        <Text style={styles.text}>{language.job_title_levels} : { dataPerson.job_title_levels }</Text>
                        <Text style={styles.text}>{language.job_company_id} : { dataPerson.job_company_id }</Text>
                        <Text style={styles.text}>{language.job_company_name} : { dataPerson.job_company_name }</Text>
                        <Text style={styles.text}>{language.job_company_website} : { dataPerson.job_company_website }</Text>
                        <Text style={styles.text}>{language.job_company_size} : { dataPerson.job_company_size }</Text>
                        <Text style={styles.text}>{language.job_company_founded} : { dataPerson.job_company_founded }</Text>
                        <Text style={styles.text}>{language.job_company_industry} : { dataPerson.job_company_industry }</Text>
                        <Text style={styles.text}>{language.job_company_linkedin_url} : { dataPerson.job_company_linkedin_url }</Text>
                        <Text style={styles.text}>{language.job_company_linkedin_id} : { dataPerson.job_company_linkedin_id }</Text>
                        <Text style={styles.text}>{language.job_company_facebook_url} : { dataPerson.job_company_facebook_url }</Text>
                        <Text style={styles.text}>{language.job_company_twitter_url} : { dataPerson.job_company_twitter_url }</Text>
                        <Text style={styles.text}>{language.job_company_location_name} : { dataPerson.job_company_location_name }</Text>
                        <Text style={styles.text}>{language.job_company_location_locality} : { dataPerson.job_company_location_locality }</Text>
                        <Text style={styles.text}>{language.job_company_location_metro} : { dataPerson.job_company_location_metro }</Text>
                        <Text style={styles.text}>{language.job_company_location_region} : { dataPerson.job_company_location_region }</Text>
                        <Text style={styles.text}>{language.job_company_location_geo} : { dataPerson.job_company_location_geo }</Text>
                        <Text style={styles.text}>{language.job_company_location_street_address} : { dataPerson.job_company_location_street_address }</Text>
                        <Text style={styles.text}>{language.job_company_location_address_line_2} : { dataPerson.job_company_location_address_line_2 }</Text>
                        <Text style={styles.text}>{language.job_company_location_postal_code} : { dataPerson.job_company_location_postal_code }</Text>
                        <Text style={styles.text}>{language.job_company_location_country} : { dataPerson.job_company_location_country }</Text>
                        <Text style={styles.text}>{language.job_company_location_continent} : { dataPerson.job_company_location_continent }</Text>
                        <Text style={styles.text}>{language.job_last_updated} : { dataPerson.job_last_updated }</Text>
                        <Text style={styles.text}>{language.job_start_date} : { dataPerson.job_start_date }</Text>
                    </View>
                </View>
                
                <View style={styles.section_row}>
                    {/* Data location */}
                    <View style={styles.section}>
                        <Text style={styles.title}>{language.title_location_data}</Text>
                        <Text style={styles.text}>{language.location_name} : { dataPerson.location_name }</Text>
                        <Text style={styles.text}>{language.location_locality} : { dataPerson.location_locality }</Text>
                        <Text style={styles.text}>{language.location_metro} : { dataPerson.location_metro }</Text>
                        <Text style={styles.text}>{language.location_region} : { dataPerson.location_region }</Text>
                        <Text style={styles.text}>{language.location_country} : { dataPerson.location_country }</Text>
                        <Text style={styles.text}>{language.location_continent} : { dataPerson.location_continent }</Text>
                        <Text style={styles.text}>{language.location_street_address} : { dataPerson.location_street_address }</Text>
                        <Text style={styles.text}>{language.location_address_line_2} : { dataPerson.location_address_line_2 }</Text>
                        <Text style={styles.text}>{language.location_postal_code} : { dataPerson.location_postal_code }</Text>
                        <Text style={styles.text}>{language.location_geo} : { dataPerson.location_geo }</Text>
                        <Text style={styles.text}>{language.location_last_updated} : { dataPerson.location_last_updated }</Text>
                    </View>

                    {/* Other data */}
                    <View style={styles.section}>
                        <Text style={styles.title}>{language.title_other_data}</Text>
                        <Text style={styles.text}>{language.interests} : { dataPerson.interests }</Text>
                        <Text style={styles.text}>{language.skills} : { dataPerson.skills }</Text>
                        <Text style={styles.text}>{language.location_names} : { dataPerson.location_names }</Text>
                        <Text style={styles.text}>{language.regions} : { dataPerson.regions }</Text>
                        <Text style={styles.text}>{language.countries} : { dataPerson.countries }</Text>
                        <Text style={styles.text}>{language.street_addresses} : { dataPerson.street_addresses }</Text>
                        <Text style={styles.text}>{language.experience} : { dataPerson.experience }</Text>
                        <Text style={styles.text}>{language.education} : { dataPerson.education }</Text>
                        <Text style={styles.text}>{language.profiles} : { dataPerson.profiles }</Text>
                        <Text style={styles.text}>{language.version_status} : { dataPerson.version_status }</Text>
                    </View>
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
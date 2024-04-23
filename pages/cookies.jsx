'use client'
import Head from 'next/head';

const host_name = process.env.NEXT_PUBLIC_HOST_NAME

const Cookies = () => {

    return (<>

        <Head>
            <meta name="robots" content="noindex" />
        </Head>

        <div class="container py-5">
            
            <div class="page-banner my-5">
                <div class="row justify-content-center align-items-center h-100">
                    <div class="col-md-6">
                    <h1 class="text-center">Politicas de cookies</h1>
                    </div>
                </div>
            </div>

            <main>
                <div class="page-section">
                <div class="container">
                    <div class="row align-items-center">
                    <div class="col-lg-12 py-3">
                    
                        <p>
                        En cumplimiento con el artículo 22 de la Ley 34/2002, de 11 de julio, de servicios de la sociedad de la información y de comercio electrónico (LSSI), en relación con el Reglamento (UE) 2016/679 del Parlamento Europeo y del Consejo, de 27 de abril de 2016, General de Protección de Datos (RGPD) y la Ley Orgánica 3/2018, de 5 de diciembre, de Protección de Datos y garantía de los derechos digitales (LOPDGDD), ADS DIGITAL pone a disposición de los usuarios la Política de recogida y tratamiento de cookies del sitio Web.
                        </p>

                        <h2 class="title-section"> Qué son las Cookies </h2>
                        <div class="divider"></div>
                        <p>Una cookie es un fichero que se descarga en tu ordenador al entrar a determinadas páginas web. Las cookies permiten a una página web, entre otras cosas, almacenar y recuperar información sobre tus hábitos de navegación y —dependiendo de la información que contengan y de la forma en que utilices tu equipo— pueden utilizarse para identificarte.</p>

                        <h2 class="title-section">Cookies utilizadas en el sitio Web</h2>
                        <div class="divider"></div>
                        <p>A continuación se clasifican las cookies utilizadas por el sitio Web {host_name} </p>
                        <p>Según la entidad que las gestiona</p>

                        <ul>
                            <li>
                                <i class="fas fa-square"></i>
                                Cookies propias: Son aquellas enviadas y gestionadas directamente por ADS DIGITAL
                            </li>
                            <li>
                                <i class="fas fa-square"></i>
                                Cookies de terceros: Son aquellas que se envían al usuario desde un dominio ajeno a ADS DIGITAL
                            </li>
                        </ul>

                        <p>Según su finalidad</p>
                        <ul>
                            <li>
                                <i class="fas fa-square"></i>
                                Cookies técnicas: Son aquellas que permiten a los usuarios registrados navegar a través del sitio Web, del área restringida y a utilizar sus diferentes funciones, como por ejemplo, el sistema de comentarios o el buscador o llevar a cabo el proceso de compra de un Producto o Servicio.
                            </li>
                            <li>
                                <i class="fas fa-square"></i>
                                Cookies de personalización: Son aquellas que permiten a los usuarios acceder al Servicio con algunas características de carácter general predefinidas en función de una serie de criterios establecidos por el usuario como, por ejemplo, el idioma o el tipo de navegador a través del cual se conecta a este sitio Web.
                            </li>
                            <li>
                                <i class="fas fa-square"></i>
                                Cookies de análisis o medición: Son aquellas que, bien tratadas por el sitio Web o por terceros, permiten cuantificar el número de usuarios y así realizar la medición y análisis estadístico de la utilización que hacen los usuarios del sitio Web. Para ello se analiza la navegación que realizas en este sitio Web con el fin de mejorarlo.
                            </li>
                        </ul>

                        <p>Según su duración</p>
                        <ul>
                            <li>
                                <i class="fas fa-square"></i>
                                Cookies de sesión: Son aquellas diseñadas para recabar y almacenar datos mientras el usuario accede al sitio Web.
                            </li>
                            <li>
                                <i class="fas fa-square"></i>
                                Cookies persistentes: Son aquellas en las que los datos siguen almacenados en el terminal del usuario y pueden ser accedidos y tratados durante un período definido por el responsable de la cookie.
                            </li>
                        </ul>

                        <h2 class="title-section">Listado de cookies utilizadas</h2>
                        <div class="divider"></div>
                        <p>Este sitio Web puede instalar las siguientes cookies:</p>
                        <p>Cookies técnicas</p>
                        <ul>
                            <li>
                                <i class="fas fa-square"></i>
                                wp-settings-{user_id}: Cookie técnica que se usa para mantener la configuración del usuario en wp-admin. Es persistente y tiene una duración de 1 año.
                            </li>
                            <li>
                                <i class="fas fa-square"></i>
                                hasConsent: Cookie técnica que almacena el consentimiento del usuario. Es persistente y tiene una duración de 1 año.
                            </li>
                        </ul>

                        <p>Cookies de análisis o medición</p>
                        <ul>
                            <li>
                                <i class="fas fa-square"></i>
                                _ga: Cookie Analítica que habilita la función de control de visitas únicas. Es persistente y tiene una duración de 2 años.
                            </li>
                            <li>
                                <i class="fas fa-square"></i>
                                _gat: Cookie Analítica para limitar el número de solicitudes. Su ámbito es la sesión y tiene una duración de 1 minuto.
                            </li>
                            <li>
                                <i class="fas fa-square"></i>
                                _gid: Cookie Analítica para distinguir usuarios. Su ámbito es la sesión y tiene una duración de 24 horas.
                            </li>
                        </ul>

                        <p>Información adicional:</p>
                        <p>Google Analytics puede instalar otras cookies según el documento Uso de las cookies de Google Analytics en sitios web.<br />
                        El sitio Web puede instalar otras cookies:</p>

                        <h2 class="title-section">Eliminación de cookies</h2>
                        <div class="divider"></div>
                        <p>Puedes aceptar, bloquear o eliminar las cookies instaladas en tu equipo mediante la configuración de las opciones del navegador, pero parte del sitio no funcionará correctamente o su calidad puede verse afectada.</p>
                        <p>En los siguientes enlaces encontrarás instrucciones para habilitar o deshabilitar las cookies en los navegadores más comunes.</p>

                        <ul>
                            <li>
                                <i class="fas fa-square"></i>
                                Firefox http://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-que-los-sitios-we
                            </li>
                            <li>
                                <i class="fas fa-square"></i>
                                Google Chrome https://support.google.com/chrome/answer/95647?hl=es
                            </li>
                            <li>
                                <i class="fas fa-square"></i>
                                Internet Explorer https://support.microsoft.com/es-es/help/17442/windows-internet-explorer-delete-manage-cookies#ie=»ie-10″
                            </li>
                            <li>
                                <i class="fas fa-square"></i>
                                Microsoft Edge https://support.microsoft.com/es-es/help/4468242/microsoft-edge-browsing-data-and-privacy
                            </li>
                            <li>
                                <i class="fas fa-square"></i>
                                Safari http://support.apple.com/kb/HT1677?viewlocale=es_ES
                            </li>
                        </ul>

                        <h2 class="title-section"> Tratamiento de Datos Personales </h2>
                        <div class="divider"></div>
                        <p>
                        ADS DIGITAL es el Responsable del tratamiento de los datos personales del usuario. Puedes consultar toda la información relativa al tratamiento de datos personales que recoge el Titular en la página de Política de Privacidad.
                        </p>

                        <h2 class="title-section"> Contacto </h2>
                        <div class="divider"></div>
                        <p>En caso de que tengas cualquier duda acerca de esta Política de Cookies o quieras realizar cualquier comentario sobre este sitio Web, puedes enviar un mensaje de correo electrónico a la dirección support@find-persons.com</p>



            
                        
                    </div>
                    
                    </div>
                </div>
                </div> 
            </main>


        </div>
    </>)

}

export default Cookies;
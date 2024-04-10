/* Sticky Navigation */
$(function() {
  
  let sticky = $('.sticky');
  let contentOffset;
  let nav_height;
  
  if (sticky.length) {
    
    if ( sticky.data('offset') ) {
      contentOffset = sticky.data('offset');
    }
    else {
      contentOffset = sticky.offset().top;
    }
    nav_height = sticky.height();
  }
  
  let scrollTop = $(window).scrollTop();
  let window_height = $(window).height();
  let doc_height = $(document).height();
  
  $(window).bind('resize', function() {
    scrollTop = $(window).scrollTop();
    window_height = $(window).height();
    doc_height = $(document).height();
    navHeight();
  });
  
  $(window).bind('scroll', function() {
    stickyNav();
  });
  
  function navHeight() {
    sticky.css('max-height', window_height + 'px');
  }
  
  function stickyNav() {
    scrollTop = $(window).scrollTop();
    if (scrollTop > contentOffset) {
      sticky.addClass('fixed');
    }
    else {
      sticky.removeClass('fixed');
    }
  }
  
  new WOW().init() 
});

$('document').ready(function() {
let nav_height = 70;
  
  $("a[data-role='smoothscroll']").click(function(e) {
    e.preventDefault();
    
  let position = $($(this).attr("href")).offset().top - nav_height;
    
    $("body, html").animate({
      scrollTop: position
    }, 1000 );
    return false;
  });
});

$('document').ready(function() {
  // Back to top
let backTop = $(".back-to-top");
  
  $(window).scroll(function() {
    if($(document).scrollTop() > 400) {
      backTop.css('visibility', 'visible');
    }
    else if($(document).scrollTop() < 400) {
      backTop.css('visibility', 'hidden');
    }
  });
  
  backTop.click(function() {
    $('html').animate({
      scrollTop: 0
    }, 1000);
    return false;
  });
});

$('document').ready(function() {
  
  // Loader
  $(window).on('load', function() {
    $('.loader-container').fadeOut();
  });
  
  // Tooltips
  $('[data-toggle="tooltip"]').tooltip();
  
  // Popovers
  $('[data-toggle="popover"]').popover();
  
  // Page scroll animate
  new WOW().init();
});

$('#testimonials').owlCarousel({
  items: 1,
  loop: true,
  autoplay: true,
  autoplayHoverPause: true,
  animateOut: 'fadeOut',
  animateIn: 'fadeIn',
});

$('document').ready(function() {
  /*
  *  Counter
  *
  *  Require(" jquery.animateNumber.min.js ", " jquery.waypoints.min.js ")
  */
  let counterInit = function() {
      
      if ( $('.counter-section').length > 0 ) {
        $('.counter-section').waypoint( function( direction ) {

          if( direction === 'down' && !$(this.element).hasClass('animated') ) {

          let comma_separator_number_step = $.animateNumber.numberStepFactories.separator(',')
            $('.number').each(function(){
            let $this = $(this),
                num = $this.data('number');
              $this.animateNumber(
                {
                  number: num,
                  numberStep: comma_separator_number_step
                }, 5000
              );
            });
            
          }

        } , { offset: '95%' } );
      }

  }

  counterInit();
  
})

// //funcion paa descargar el pdf
// $('#download-informe').on('click', (res)=>{
    
    
    
//     const elementHTML = document.createElement('div')
//     elementHTML.setAttribute('id', 'render-html')
    
//     let outhtml = `
//       <div class="d-flex" style="width: 100%;">
//         <img src="../wp-public/theme_search_persons/assets/img/logo_find-persons.png" width="50rem" style="transform: scale(5.3); margin: 20px 0px 0px 60px">
//         <div style="margin-left: auto;">${results_search_api.serach_info.search_time}</div>
//       </div>
//       <div class="mb-4">
          
//         <center>
//           <h1> Informe de resultados </h1>
//         </center><hr/>

//       </div>
//     `

//     if(results_search_api.people_data_lab !== null){
//       //${results_search_api.people_data_lab.}
//       outhtml += `
        
        
//         <div class="container">
//             <div class="row mb-5" >
                
//                 <div class="col-4">
//                     <div class="mb-2">
//                         <img src="../wp-public/theme_search_persons/assets/img/no_user_image.jpeg" width="100%" height="100%">
//                     </div>
//                     <div>
//                         <center><h3>${results_search_api.people_data_lab.full_name}</h3></center>
//                     </div>
//                 </div>
                
                
//       `
      
      
//     } else{
//         outhtml += `
//         <div class="container">
//             <div class="row mb-5" >
                
//                 <div class="col-4">
//                     <div class="mb-2">
//                         <img src="../wp-public/theme_search_persons/assets/img/no_user_image.jpeg" width="100%" height="100%">
//                     </div>
//                     <div>
//                         <center><h3>${results_search_api.serp_api.search_parameters.query}</h3></center>
//                     </div>
//                 </div>
//       `
//     }
    
//     if(results_search_api.serp_api){
      
//         outhtml += `
//                 <div class="col-8">
//                         <ul>
//                             <li> Nombre completo: <b>${results_search_api.serp_api.search_parameters.query}</b> </li>
//                             <li> Fecha de nacimiento: <b>${results_search_api.serp_api.knowledge_graph.born}</b> </li>
//                             <li> Correo personal: <b>N/A</b> </li>
//                             <li> Correo de empresa: <b>N/A</b> </li>
//                             <li> Numero de telefono: <b>N/A</b> </li>
//                         </ul>
//                     </div>
//                 </div>
//             </div>
//             <hr/>
//             <div class="container">
//                 <div class="row mb-5" >
//                     <div class="row">
//         `
        
//         let title, snippet, url
        
//         outhtml += `
//         <style>
//             .break-page {
//               page-break-after: always;
//             }
//         </style>
//         <div class="col-12 break-page" id="results-container">
            
//             <!--<h3 class="text-center">Resultados de búsqueda de ${results_search_api.serp_api.search_parameters.query}</h3>-->
            
//             ${results_search_api.serp_api.knowledge_graph.description ? `
//                 <h4>Descripción:</h4>
//                 <p>${results_search_api.serp_api.knowledge_graph.description}</p>
//             ` : ''}
            
//             ${results_search_api.serp_api.knowledge_graph.born ? `
//                 <h4>Fecha de nacimiento:</h4>
//                 <p>${results_search_api.serp_api.knowledge_graph.born}</p>
//             ` : ''}
            
          
            
//             ${results_search_api.serp_api.top_stories.length > 0 ? `
//                 <h4>Principales noticias:</h4>
//                 <ul>
//                     ${results_search_api.serp_api.top_stories.map(story => `
//                         <li><a href="${story.url}">${story.title}</a></li>
//                     `).join('')}
//                 </ul>
//             ` : ''}
            
//             <h4>Atributos conocidos:</h4>
//             <ul>
//                 ${results_search_api.serp_api.knowledge_graph.known_attributes.map(attribute => `
//                     <li><strong>${attribute.name}:</strong> ${attribute.value}</li>
//                 `).join('')}
//             </ul>
            
//             <h4>Resultados orgánicos:</h4>
//             <ul>
//                 ${results_search_api.serp_api.organic_results.map(result => `
//                     <li><a href="${result.url}">${result.title}</a></li>
//                 `).join('')}
//             </ul>
//         </div>
//         `
        
//         /*for(let res in results_search_api.serp_api.organic_results){
          
//             title = results_search_api.serp_api.organic_results[res].title,
//             snippet = results_search_api.serp_api.organic_results[res].snippet
//             url = results_search_api.serp_api.organic_results[res].url
            
            
            
//             outhtml += ` <div class="col-6">
//                 <div class="mb-3">
//                     <h3>${title}</h3>
//                     <!--<b>${snippet}</b><br/>-->
//                     <b style="font-size: 0.7rem">${url}</b>
//                 </div>
//             </div>`
//         }    */        
                      
                        
//         outhtml += `                
//                     </div>
//                 </div>
//             </div>
//         `

      
//     }

    
//     const convertHtmlToPdf = async () => {
//       const elementHTML = document.createElement('div');
//       elementHTML.id = 'render-html';
//       elementHTML.innerHTML = outhtml;
    
//       document.body.appendChild(elementHTML);
    
//       const options = {
//           margin: [10, 10, 10, 10],
//           filename: 'Informe - busqueda',
//           image: { type: 'jpeg', quality: 0.98 },
//           html2canvas: { dpi: 192, letterRendering: true, useCORS: true },
//           jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
//           pagebreak: { mode: 'css' },
//         };
    
//       try {
//         const pdf = await html2pdf().set(options).from(elementHTML).toPdf().output('datauristring');
//         const link = document.createElement('a');
//         link.href = pdf;
//         link.download = options.filename;
//         link.click();
//       } catch (error) {
//         console.error('Error al generar el PDF:', error);
//       } finally {
//         elementHTML.remove();
//       }
//     };
    
//     convertHtmlToPdf();

    
    

    






// })

// //test pdf
// $(document).on('click', '#download-inf', (res)=>{
    
    
//     const elementHTML = document.createElement('div')
//     elementHTML.setAttribute('id', 'render-html')
    
//     let outhtml = `
//       <div class="d-flex">
//         <img src="../wp-public/theme_search_persons/assets/img/logo_find-persons.png" width="25%">
//         <div style="margin-left: auto;">${results_search_api.serach_info.search_time}</div>
//       </div>
//       <div class="mb-4">
          
//         <center>
//           <h1> Informe de resultados </h1>
//         </center><hr/>

//       </div>
//     `

//     if(results_search_api.people_data_lab !== null){
//       //${results_search_api.people_data_lab.}
//       outhtml += `
        
        
//         <div class="container">
//             <div class="row mb-5" >
                
//                 <div class="col-4">
//                     <div class="mb-2">
//                         <img src="../wp-public/theme_search_persons/assets/img/no_user_image.jpeg" width="100%" height="100%">
//                     </div>
//                     <div>
//                         <center><h3>${results_search_api.people_data_lab.full_name}</h3></center>
//                     </div>
//                 </div>
                
//                 <div class="col-8">
//                     <ul>
//                         <li> Nombre completo: <b>${results_search_api.people_data_lab.full_name}</b> </li>
//                         <li> Genero: <b>${ (results_search_api.people_data_lab.gender == 'male') ? 'Hombre' : 'Mujer' }</b> </li>
//                         <li> Fecha de nacimiento: <b>${results_search_api.people_data_lab.birth_date}</b> </li>
//                         <li> Correo personal: <b>${results_search_api.people_data_lab.emails[0].address}</b> </li>
//                         <li> Correo de empresa: <b>${results_search_api.people_data_lab.work_email}</b> </li>
//                         <li> Numero de telefono: <b>${results_search_api.people_data_lab.phone_numbers[0]}</b> </li>
//                     </ul>
//                 </div>
//             </div>
//         </div>
//         <hr/>
//       `
      
      
//     } else{
//         outhtml += `
        
        
//         <div class="container">
//             <div class="row mb-5" >
                
//                 <div class="col-4">
//                     <div class="mb-2">
//                         <img src="../wp-public/theme_search_persons/assets/img/no_user_image.jpeg" width="100%" height="100%">
//                     </div>
//                     <div>
//                         <center><h3>N/A</h3></center>
//                     </div>
//                 </div>
                
//                 <div class="col-8">
//                     <ul>
//                         <li> Nombre completo: <b>N/A</b> </li>
//                         <li> Genero: <b>N/A</b> </li>
//                         <li> Fecha de nacimiento: <b>N/A</b> </li>
//                         <li> Correo personal: <b>N/A</b> </li>
//                         <li> Correo de empresa: <b>N/A</b> </li>
//                         <li> Numero de telefono: <b>N/A</b> </li>
//                     </ul>
//                 </div>
//             </div>
//         </div>
//         <hr/>
//       `
//     }
    
//     if(results_search_api.serp_api){
      
//         outhtml += `
//             <div class="container">
//                 <div class="row mb-5" >
//                     <div class="row">
//         `
//         let title, snippet, url
        
//         for(let res in results_search_api.serp_api.organic_results){
          
//             title = results_search_api.serp_api.organic_results[res].title,
//             snippet = results_search_api.serp_api.organic_results[res].snippet
//             url = results_search_api.serp_api.organic_results[res].url
            
//             console.log(title, snippet, url )
//             outhtml += ` <div class="col-6">
//                 <div class="mb-3">
//                     <h3>${title}</h3>
//                     <!--<b>${snippet}</b><br/>-->
//                     <b style="font-size: 0.7rem">${url}</b>
//                 </div>
//             </div>`
//         }            
                      
                        
//         outhtml += `                
//                     </div>
//                 </div>
//             </div>
//         `

      
//     }

//     elementHTML.innerHTML = outhtml

//     const ConvertHtmlToPdf = async (req, res)=>{
        
//         await document.body.appendChild(elementHTML)
    
//         await html2pdf().set({
//           margin: [10, 10, 20, 10],
//           filename: 'Informe - busqueda',
//           image: {type: 'jpeg', quality: 1},
//           html2canvas: {dpi: 192, letterRendering: true},
//           jsPDF: {unit: 'mm', format: 'a4', orientation: 'portrait'},
//           pageBreak: {mode: ['avoid-all', 'css'], avoid: ['.pi-row']},
//         }).from($('#render-html')[0]).toPdf().save()
        
//         $('#render-html').remove()
        
        
//         $.ajax({
//             type: 'POST',
//             url: url,
//             data: {
//                 petition: 'reg_download',
//                 data: results_search_api
//             },
//             beforeSend: ()=>{
//                 console.log('enviando....')
//             },
//             success: (res)=>{
//                 console.log(res)
//             }
//         })
        
//         delete elementHTML
        
        
//     }
    
//     ConvertHtmlToPdf(null, null)
    
// })





  

  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  

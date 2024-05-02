

// const path_endpoint = process.env.NEXT_PUBLIC_PATH_END_POINT

// const CheckTokenValidity = async ( token ) => {
    
//     try{

//         // Fetch to endpoint for get payment
//         const req = await fetch( path_endpoint, {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({
//                 "petition" : {
//                     "name": "validate_payment_token",
//                     "data": {
//                         "validate_payment_token": {
//                             "payment_id": token
//                         }
//                     }
//                 }
//             })
//         })
        
//         const res = await req.json()
//         if( res.status === 'error' ) return false

//     } catch ( error ) {
//         return false
//     }
    
//     return true
    
// }

// const InvalidateToken = async ( token ) => {
    
//     try{

//         // Fetch to endpoint for get payment
//         const req = await fetch( path_endpoint, {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({
//                 "petition" : {
//                     "name": "invalidate_payment_token",
//                     "data": {
//                         "invalidate_payment_token": {
//                             "payment_id": token
//                         }
//                     }
//                 }
//             })
//         })
        
//         const res = await req.json()
//         if( res.status === 'error' ) return false

//     } catch ( error ) {
//         return false
//     }
    
//     return true


// }

// const ExistsPayment = async ( payment_id ) => {
    
//     try{

//         // Fetch to endpoint for get payment
//         const req = await fetch( path_endpoint, {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({
//                 "petition" : {
//                     "name": "exists_payment",
//                     "data": {
//                         "payment": {
//                             "payment_id": payment_id
//                         }
//                     }
//                 }
//             })
//         })
        
//         const res = await req.json()
//         if( res.status === 'error' ) return false

//     } catch ( error ) {
//         return false
//     }
    
//     return true
// }

// const CreateNewUser = async ( user ) => {

//     const country = localStorage.getItem('language')
  
//     try{
        
//         // Fetch to endpoint for get payment
//         const req = await fetch( path_endpoint, {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({
//                 "petition" : {
//                     "name": "create_new_user",
//                     "data": {
//                         "create_new_user": {
//                             "user_name": user.displayName ? user.displayName : user.email,
//                             "user_email": user.email,
//                             "password": user.uid,
//                             "role": "suscriber",
//                             "status": "active",
//                             "country": country,
//                             "ip": ""
//                         }
//                     }
//                 }
//             })
//         })
        
//         const res = await req.json()
//         if( res.status === 'error' ) return false
            
//     } catch ( error ) {
//         return false
//     }

//     return true
// }

// const UpdateSuscription = async ( user, suscription ) => {

//     try{

//         // Fetch to endpoint for update suscription
//         const req = await fetch( path_endpoint, {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({
//                 "petition" : {
//                     "name": "update_suscription",
//                     "data": {
//                         "update_suscription": {
//                             "user_email": user.email,
//                             "payment_id": suscription.payment_id,
//                             "status": "trial",
//                         }
//                     }
//                 }
//             })
//         })

//         const res = await req.json()
//         if( res.status === 'error' ) return false

//     } catch ( error ) {
//         return false
//     }

//     return true

// }

export default function handler( req, res ) {
    
    const method = req.method
    const user = JSON.parse( localStorage.getItem('user') )
    const payment_token = req.query.payment_id
    const payment_id = req.query.payment_id.split('-')[0]
    const signature = req.query.payment_id.split('-')[1]

    let extension  = req.query.payment_id.split('-')[2] 
    let result = false

    if( extension === 'es' ) 
        extension = ''

    if ( method === 'POST' )
        res.status( 200 ).json({ 
            message: 'valid',
            method: method,
            user: user,
            payment_token: payment_token,
            payment_id: payment_id,
            signature: signature,
            extension: extension
        })
    else 
        res.status( 405 ).json({ error: 'Método no permitido' })

    // if ( method === 'POST' ) {

    //     ExistsPayment( payment_id )
        
    //     .then( res => {
    //         result = res
    //         if ( !res ) res.status( 403 ).json({ error: 'invalid_payment' })
    //         else return CheckTokenValidity( payment_token )
    //     })
        
    //     .then( res => {
    //         result = res
    //         if ( !res ) res.status( 403 ).json({ error: 'invalid_token' })
    //         else return validatePayment()
    //     })
        
    //     .then( res => {
    //         result = res
    //         if ( !res ) res.status( 403 ).json({ error: 'invalid_payment' })
    //         else return CreateNewUser( user )
    //     })
        
    //     .then( res => {
    //         result = res
    //         if ( !res ) res.status( 403 ).json({ error: 'create_user_error' })
    //         else return UpdateSuscription(user, { payment_id: payment_id })
    //     })
        
    //     .then( res => {
    //         result = res
    //         if ( !res ) res.status( 403 ).json({ error: 'update_suscription_error' })
    //         else return true
    //     })
        
    //     .catch( error => {
    //         InvalidateToken( payment_token )
    //         res.status( 500 ).json({ error: error.message })
    //         return false
    //     })
        
    //     .finally(() => {
            
    //         // Invalidando token
    //         InvalidateToken( payment_token )

    //         if ( !result ) {
    //             //res.redirect( 303, `/${extension}`)
    //             res.status( 403 ).json({ error: 'InvalidateToken' })
    //             return false
    //         }

    //         //res.redirect( 303, `/${extension}/thanks/${payment_id} `)  
    //         res.status( 200 ).json({ message: 'valid' })
    //         return true

    //     })

    // } 
    
    // else {
        
    //     // Método no permitido
    //     res.status( 405 ).json({ error: 'Método no permitido' })

    // }

}
const path_endpoint = process.env.NEXT_PUBLIC_PATH_END_POINT

export const CheckTokenValidity = async ( token ) => {
    
    try{

        // Fetch to endpoint for get payment
        const req = await fetch( path_endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "petition" : {
                    "name": "validate_payment_token",
                    "data": {
                        "validate_payment_token": {
                            "payment_id": token
                        }
                    }
                }
            })
        })
        
        const res = await req.json()
        if( res.status === 'error' ) return false

    } catch ( error ) {
        return false
    }
    
    return true
    
}

export const InvalidateToken = async ( token ) => {
    
    try{

        // Fetch to endpoint for get payment
        const req = await fetch( path_endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "petition" : {
                    "name": "invalidate_payment_token",
                    "data": {
                        "invalidate_payment_token": {
                            "payment_id": token
                        }
                    }
                }
            })
        })
        
        const res = await req.json()
        if( res.status === 'error' ) return false

    } catch ( error ) {
        return false
    }
    
    return true


}

export const ExistsPayment = async ( payment_id ) => {
    
    try{

        // Fetch to endpoint for get payment
        const req = await fetch( path_endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "petition" : {
                    "name": "exists_payment",
                    "data": {
                        "payment": {
                            "payment_id": payment_id
                        }
                    }
                }
            })
        })
        
        const res = await req.json()
        console.log(res)
        return res
        //if( res.status === 'error' ) return false

    } catch ( error ) {
        console.log(error)
        return error
    }
    
    //return true
}

export const CreateNewUser = async ( user ) => {

    try{
        
        // Fetch to endpoint for get payment
        const req = await fetch( path_endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "petition" : {
                    "name": "create_new_user",
                    "data": {
                        "create_new_user": {
                            "user_name": user.user_name,
                            "user_email": user.user_email,
                            "password": user.password,
                            "role": "suscriber",
                            "status": "active",
                            "country": user.country,
                            "ip": ""
                        }
                    }
                }
            })
        })
        
        const res = await req.json()
        if( res.status === 'error' ) return false
            
    } catch ( error ) {
        return false
    }

    return true
}

export const UpdateSuscription = async ( email, payment_id ) => {

    try{

        // Fetch to endpoint for update suscription
        const req = await fetch( path_endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "petition" : {
                    "name": "update_suscription",
                    "data": {
                        "update_suscription": {
                            "user_email": email,
                            "payment_id": payment_id,
                            "status": "trial"
                        }
                    }
                }
            })
        })

        const res = await req.json()
        if( res.status === 'error' ) return false

    } catch ( error ) {
        return false
    }

    return true

}

export default function handler( req, res ) {
    
    if ( req.method !== 'POST' ) {
        return res.status(405).json({ error: 'Método no permitido' })
    }

    // https://www.persons-finder.com/api/thanks/202405081309065850000-03bb9a357690666d31f9d1fbfea1ca400f829763-fr-prueba_pago0001_fr@mail.com-prueba_pago0001_fr-Lhxl8dR32LUoEIA4j9HWjMbij8c2

    //https://www.find-persons.com/api/thanks/202405090952517290000-f02e78948ca8a1d5b8b334c9df8a179005b4b130-es-prueba_iframe1234@gmail.com-prueba_iframe1234-eVjHaUlQ10RZ8fpQ8lA17n2RJZ52

    const payment = req.query.payment_id
    const parts = payment.split('-')
    const payment_token = parts[0]+'-'+parts[1]
    const payment_id = parts[0]
    const signature = parts[1]
    const extension = parts[2] 
    const user = {
        user_email: parts[3],
        user_name: parts[4],
        password: parts[5],
        country: parts[2]
    }

    let redirect_url = ''
    if( extension !== 'es' ) {
        redirect_url = `/${extension}/thanks/${payment_token}`
    } else {
        redirect_url = `/thanks/${payment_token}`
    }

    ExistsPayment( payment_id )
    .then(paymentExists => {
        if (!paymentExists) throw new Error(
            {
                message: 'payment_not_exists',
                payment_id: payment_id,
                data: paymentExists
            }
        )
        return CheckTokenValidity(payment_token)
    })
    .then(tokenIsValid => {
        if (!tokenIsValid) throw new Error('invalid_token')
        return CreateNewUser(user)
    })
    .then(userCreated => {
        if (!userCreated) throw new Error('create_user_error')
        return UpdateSuscription(user.user_email, payment_id )
    })
    .then(subscriptionUpdated => {
        if (!subscriptionUpdated) throw new Error('update_subscription_error')
        res.redirect(303, redirect_url)
    })
    .catch(error => {   
        InvalidateToken( payment_token )
        res.status(500).json({ error: error.message })
    })


}
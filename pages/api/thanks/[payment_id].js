

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
        if( res.status === 'error' ) return false

    } catch ( error ) {
        return false
    }
    
    return true
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
        return res
        //if( res.status === 'error' ) return false
            
    } catch ( error ) {
        return false
    }

    return true
}

export const UpdateSuscription = async ( user, suscription ) => {

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
                            "user_email": user.email,
                            "payment_id": suscription.payment_id,
                            "status": "trial",
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

    const payment = req.query.payment_id
    const parts = payment.split('-')
    const payment_token = parts[0]+'-'+parts[1]
    const payment_id = parts[0]
    const signature = parts[1]
    const extension = parts[2] === 'es' ? '' : parts[2]
    const user = JSON.parse(parts[3])
    
    ExistsPayment( payment_id )
    .then(paymentExists => {
        if (!paymentExists) throw new Error('invalid_payment')
        return CheckTokenValidity(payment_token)
    })
    .then(tokenIsValid => {
        if (!tokenIsValid) throw new Error('invalid_token')
        return CreateNewUser(user)
    })
    .then(userCreated => {
        if (!userCreated) throw new Error('create_user_error')
        return UpdateSuscription(user, { payment_id })
    })
    .then(subscriptionUpdated => {
        if (!subscriptionUpdated) throw new Error('update_subscription_error')
        res.redirect(303, `/${extension}/thanks/${payment_id}`)
    })
    .catch(error => {
        InvalidateToken(payment_token)
        res.status(500).json({ error: error.message })
    })


}




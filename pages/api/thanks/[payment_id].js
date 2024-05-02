

export default function handler( req, res ) {
    
    const method = req.method
    const extension  = req.query.payment_id

    if ( req.method === 'POST' ) 
        res.json({ 
            message: 'POST request to the API',
            method: method,
            payment_id: extension.split('-')[1] 
        })
        //res.redirect( 303, `/thanks/${req.query.payment_id} `)
        
        
    // } else {
    //     // Método no permitido
    //     res.status(405).json({ error: 'Método no permitido' })
    // }







}


export default function handler(req, res) {
    
    if (req.method === 'POST') {
        // Procesa los datos POST aquí
        
        // Rediriges al usuario a la página de agradecimiento con el ID del pago
        res.redirect(`/thanks/${req.query.payment_id}`);
    } else {
        // Método no permitido
        res.status(405).json({ error: 'Método no permitido' });
    }


}
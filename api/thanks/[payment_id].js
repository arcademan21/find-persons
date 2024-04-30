

export default (req, res) => {
    
    const { query: { id_payment } } = req;

    if (req.method === 'POST') {
        // Procesa los datos POST aquí
        res.status(200).json({ message: 'Pago procesado correctamente', id: id_payment });
    } else {
        // Método no permitido
        res.status(405).send({ error: 'Método no permitido' });
    }

};
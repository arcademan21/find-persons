
module.exports = (req, res) => {
    if (req.method === 'POST') {
        // Procesa los datos POST aquí
        res.status(200).send({ message: 'Pago procesado correctamente' });
    } else {
        // Método no permitido
        res.status(405).send({ error: 'Método no permitido' });
    }
};
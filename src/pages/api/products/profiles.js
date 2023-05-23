const fs = require('fs');

const Profiles = (req, res) => {
    if (req.method == 'POST') {
        const historialProductos = req.body;
        
        const data = JSON.stringify(historialProductos, null, 2);

        // Ruta y nombre del archivo JSON donde se guardarán los datos
        const filePath = 'C:/Users/molma/OneDrive/Documentos/Proyectos Escolares/comicucei/src/pages/api/products/history.json';
        return new Promise((resolve, reject) => {
            fs.writeFile(filePath, data, 'utf8', (error) => {
            if (error) {
                console.error('Error al escribir en el archivo JSON:', error);
                res.status(500).json({ message: 'Error al guardar el historial de productos.' });
            } else {
                console.log('Historial de productos guardado en el archivo JSON:', filePath);
                res.status(200).json({ message: 'Historial de productos guardado exitosamente.' });
            }
            });
        });
    } 
    else {
        res.status(404).json({ message: 'Página no encontrada.' });
    }
};

export default Profiles;
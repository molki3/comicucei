import { conn } from "@sspis-comicucei/utils/database";

export default async function handler(req, res){

    switch(req.method){
        case 'GET':
            return await getProducts(req, res);
        case 'POST':
            return await saveProduct(req, res);
        case 'PUT':
            return res.status(200).json({message: "EDITING PRODUCTOS"});
        case 'DELETE':
            return res.status(200).json({message: "DELETING PRODUCTOS"});
    }
}

const getProducts = async (req, res) =>{
    const result = await conn.query('SELECT * FROM PRODUCTO');
    return res.status(200).json(result);
}

const saveProduct = async (req, res) => {
    const {nombre, precio, calidad, momento, origen} = req.body;

    //CONVERTIR OBJETOS EN CADENAS
    const _nombre = nombre[0];
    const _precio = parseFloat(precio);
    const _calidad = calidad[0];
    const _momento = momento[0];
    const _origen = origen[0];

    //INSERCION DE DATOS            
    const result = await conn.query('INSERT INTO PRODUCTO (nombre, precio, calidad, momento, origen) VALUES ($1, $2, $3, $4, $5)', [
        _nombre, 
        _precio, 
        _calidad, 
        _momento, 
        _origen
    ]);

    console.log(result)
    return res.status(200).json({nombre, precio, calidad, momento, origen});
}
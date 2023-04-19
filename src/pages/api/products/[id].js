//RUTA DINAMICA PARA PRODUCTOS
export default function handler(req, res){
    console.log(req.method)
    return res.status(200).json("PRODUCTO " + req.query.id);
}
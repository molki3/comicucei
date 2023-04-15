import jwt from "jsonwebtoken";
import { serialize } from "cookie";

const loginHandler = (req, res) =>{

    const {codigo, password} = req.body;

    console.log("DESDE API LOGIN: ",codigo, password);

    //AQUI HACER CONEXION Y EXTRACCION DE DATOS POR LA BASE DE DATOS

    //PRUEBA A MANO
    if(codigo=='220790806' && password=='123'){
        
        const token = jwt.sign({
            exp: Math.floor(Date.now()/1000) + 60 * 60 * 24 * 30, //el token caduca en 1 mes
            codigo: '220790806',//AGREGAR MAS
            nombre: 'manuel'
        }, 'secret')

        const serialized = serialize('tokenUser', token, {    //serializar el token para establecerlo como cookie de forma segura
            httpOnly: true,                                         //el token no podrá ser visot desde herramientas de desarrollador ni navegador
            secure: process.env.NODE_ENV === 'production',          //si esta en produccion, pon la seguridad en true
            sameSite: 'strict',                                     //poderse comunicar con distintos backends
            path: '/'                                  
        })   

        res.setHeader('Set-Cookie', serialized);     //mandar el token serializado al frontend por medio de la cabecera

        return res.json('login succesfully');
    }
    else{
        return res.status(401).json({error: 'email or password incorrect'});
    }


}

export default loginHandler
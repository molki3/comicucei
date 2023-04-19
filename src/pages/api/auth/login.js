import jwt from "jsonwebtoken";
import { serialize } from "cookie";
import { conn } from "@sspis-comicucei/utils/database";

const loginHandler = async (req, res) =>{

    const {codigo, password} = req.body;

    //AQUI HACER CONEXION Y EXTRACCION DE DATOS POR LA BASE DE DATOS
    const response = await conn.query(`select * from usuario where codigo='${codigo}'`);
    const code = response.rows[0].codigo;
    const pass = response.rows[0].password;
    const name = response.rows[0].nombre;

    if(codigo==code && password==pass){
        
        const token = jwt.sign({
            exp: Math.floor(Date.now()/1000) + 60 * 60 * 24 * 30, //el token caduca en 1 mes
            codigo: code,//AGREGAR MAS
            nombre: name
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
        return res.json('Código o contraseña incorrecto');
    }

}

export default loginHandler
import { verify } from "jsonwebtoken";
import {serialize} from 'cookie'

export default function logoutHandler(req, res){
    
    //EXTRACCION DEL TOKEN
    const {tokenUser} = req.cookies;
    
    //SI TOKEN EXISTE O NO...
    if(!tokenUser){
        return res.status(401).json({error:"no token"});
    }

    //VALIDA TOKEN
    try {
        verify(tokenUser, 'secret');
        const serialized = serialize('tokenUser', null, {    //serializar el token para establecerlo como cookie de forma segura
            httpOnly: true,                                         //el token no podrá ser visot desde herramientas de desarrollador ni navegador
            secure: process.env.NODE_ENV === 'production',          //si esta en produccion, pon la seguridad en true
            sameSite: 'strict',  
            maxAge: 0,                                   //poderse comunicar con distintos backends
            path: '/'                                  
        })
        
        res.setHeader('Set-Cookie', serialized);     //mandar el token serializado al frontend por medio de la cabecera
        
        return res.status(200).json('logout succesfully');
    } catch (error) {
        return res.status(401).json({error:'invalid token'});
    }
}
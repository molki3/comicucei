import {verify} from 'jsonwebtoken'

export default function profileHandler(req,res) {
  
  //SI EL USUARIO INICIO SESIÓN, IMPRIME SU COOKIE, SINO MANDA UN OBJETO VACIO
  const {tokenUser} = req.cookies;

  //SI NO EXISTE EL TOKEN...
  if(!tokenUser){
    return res.status(401).json({error:"no token"});
  }

  //VALIDAR EL TOKEN
  try 
  {
    //GUARDA EL TOKENUSER CON ATRIBUTOS COMO CODIGO, NOMBRE, FECHAEXPIRACION
    const user = verify(tokenUser, 'secret');
    return res.json({codigo: user.codigo, nombre: user.nombre});
  } 
  catch (error) 
  {
    return res.status(401).json({error:'invalid token'});
  }
  
}

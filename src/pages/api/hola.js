import { conn } from "@sspis-comicucei/utils/database";

export default async function handler(req, res){
    const result = await conn.query('SELECT NOW()');
    console.log(result.rows[0]['now']);
    
    return res.status(200).json({message: "ok"});
}
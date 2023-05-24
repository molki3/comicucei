import axios from 'axios';
import { conn } from '@sspis-comicucei/utils/database';

export default async function handler(req, res) {
    const { term } = req.query;
    console.log(term)
    try {
        const response = await conn.query(`
        SELECT * 
        FROM producto
        WHERE nombre ILIKE '%${term}%' or momento ILIKE '%${term}%'
        `);
        
        const results = response.rows;

        res.status(200).json(results);
    } catch (error) {
        console.error('Error al realizar la búsqueda:', error);
        res.status(500).json({ message: 'Error al realizar la búsqueda' });
    }
}

import { Request, Response } from 'express'; // Certifique-se de usar aspas simples ou duplas para importar módulos

import { Product } from '../models/Product';

import { createMenu } from '../helpers/createMenu';

import { Op } from 'sequelize';

export const search = async (req: Request, res: Response) => { // Use "async" aqui para esperar a conclusão da consulta ao banco de dados
    let query = req.query.q as string;

    try {
        const products = await Product.findAll({
            where: { 
                [Op.or]: [
                    {
                      name: {
                        [Op.like]: `%${query}%`
                      }
                    },
                    {
                      category: {
                        [Op.like]: `%${query}%`
                      }
                    }
                  ]
            },
            
        })

        res.render('pages/page', { 
            menu: createMenu(''),
            products,
            query,
        });
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        res.status(500).send('Erro ao buscar produtos'); // Lidar com erros adequadamente
    }
};
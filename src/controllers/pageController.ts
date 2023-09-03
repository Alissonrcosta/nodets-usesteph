import {Request, Response} from 'express';
import { createMenu } from '../helpers/createMenu';
import { Product } from '../models/Product';


//Criar Produto

export const addProduct = (req: Request, res: Response)=>{
res.render('pages/novo-produto')
}
export const addProductAction = async (req: Request, res: Response)=>{
  let { name, category, amount, value, color} = req.body;
  
    
        // Criar um novo produto com os dados fornecidos
        const newProduct = await Product.build({
          name,
          category,
          amount,
          value,
          color,
        });
    
        // Salvar o novo produto no banco de dados (se estiver usando um ORM)
        await newProduct.save();


    res.redirect('/');
}

export const home = async (req:Request, res:Response)=>{
    let products = await Product.findAll({});
    res.render('pages/page', {
        menu: createMenu('all'),
        banner: {
            title: 'Semi Jóias Hipoalergênicas',
            background: 'banner5.jpg'
        },
        products
    });
};

export const earrings = async (req:Request, res:Response)=>{
    let products = await Product.findAll({
        where:{
            category: 'brincos'
        }
    })

    res.render('pages/page', {
        products,
        menu: createMenu('earrings'),
        banner: {
            title: 'Brincos',
            background: 'earings.jpg'
        }
    });
};
export const chains = async (req:Request, res:Response)=>{
    let products = await Product.findAll({
        where:{
            category: 'colares'
        }
    })
    res.render('pages/page', {
        products,
        menu: createMenu('chains'),
        banner: {
            title: 'Colares',
            background: 'galhos.jpg'
        }
    });
};
export const rings = async (req:Request, res:Response)=>{
    let products = await Product.findAll({
        where:{
            category: 'aneis'
        }
    })
    res.render('pages/page', {
        products,
        menu: createMenu('rings'),
        banner: {
            title: 'Anéis',
            background: 'folhas.jpg'
        }
    });
};

export const updateProduct = async(req: Request, res: Response)=>{
    let id: string = req.params.id;
    
    let results = await Product.findByPk(id)
    
    res.render('pages/editar-produto', {
        id,
        results
    });
};

export const updateProductAction = async(req: Request, res: Response)=>{
    let id: string = req.params.id;
    let { name, category, amount, value, color} = req.body;
    console.log('ID', id)
  
    
        // Criar um novo produto com os dados fornecidos
        let results = await Product.findAll({where:{id:id}});
        if(results.length>0){
        let product = results[0]
        product.name = name;
        product.category = category;
        product.amount = amount;
        product.value = value;
        product.color = color;
        await product.save();
    }


    res.redirect('/');
}


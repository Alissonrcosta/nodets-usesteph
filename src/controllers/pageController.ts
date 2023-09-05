import { Request, Response } from 'express';
import { createMenu } from '../helpers/createMenu';
import { Product } from '../models/Product';
import sharp from 'sharp';
import { unlink } from 'fs/promises'

//Criar Produto
export const addProduct = (req: Request, res: Response) => {
    res.render('pages/novo-produto')
}
export const addProductAction = async (req: Request, res: Response) => {
    let { name, category, amount, value, color } = req.body;

  if (req.file) {
    const filename = `${req.file.filename}.jpg`;

    await sharp(req.file.path)
      .resize(500,500)
      .toFormat('jpeg')
      .toFile(`./public/media/${filename}`);
    
    // Remover o arquivo temporário
    await unlink(req.file.path);
    
  } else {
    res.status(400);
    res.json({ error: 'Arquivo inválido' });
    return; 
  }
    
  value = parseFloat(value);
  // Criar um novo produto com os dados fornecidos
  const newProduct = await Product.build({
    name,
    category,
    amount,
    value,
    color,
    image: `${req.file.filename}.jpg`,
  });

  newProduct.save();
  
  res.redirect('/');
};


export const home = async (req: Request, res: Response) => {
    let products = await Product.findAll({
        attributes: [
            'id', 'name', 'category', 'amount', 'color', 'value', 'image'

        ],
        order: ['name']
    });
    res.render('pages/page', {
        menu: createMenu('all'),
        banner: {
            title: 'Semi Jóias Hipoalergênicas',
            background: 'banner5.jpg'
        },
        products
    });
};

export const earrings = async (req: Request, res: Response) => {
    let products = await Product.findAll({
        where: {
            category: 'brincos'
        },
        order: ['name']
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
export const chains = async (req: Request, res: Response) => {
    let products = await Product.findAll({
        where: {
            category: 'colares'
        },
        order: ['name']
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
export const rings = async (req: Request, res: Response) => {
    let products = await Product.findAll({
        where: {
            category: 'aneis'
        },
        order: ['name']
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

export const updateProduct = async (req: Request, res: Response) => {
    let id: string = req.params.id;

    let results = await Product.findByPk(id)
    res.render('pages/editar-produto', {
        id,
        results,
    });
    
};

export const updateProductAction = async (req: Request, res: Response) => {
    let id: string = req.params.id;
    let { name, category, amount, value, color} = req.body;

    if (req.file) {
        const filename = `${req.file.filename}.jpg`;
        
        await sharp(req.file.path)
          .resize(500,500)
          .toFormat('jpeg')
          .toFile(`./public/media/${filename}`);
        
        // Remover o arquivo temporário
        await unlink(req.file.path);
        console.log('Enviado:', req.file);
      } else {
        res.status(400);
        res.json({ error: 'Arquivo inválido' });
        return; // Encerrar a função se não houver arquivo
      }
    
      // Certificar-se de que value seja convertido para número corretamente
      value = parseFloat(value);

    // Criar um novo produto com os dados fornecidos
    let results = await Product.findAll({ where: { id: id } });
    if (results.length > 0) {
        let product = results[0]
        product.name = name;
        product.category = category;
        product.amount = amount;
        product.value = value;
        product.color = color;
        product.image = `${req.file.filename}.jpg`
        await product.save();
    }


    res.redirect('/');
};

export const deleteProduct = async (req: Request, res: Response) => {
    let id: string = req.params.id;
    

    let results = await Product.findAll({ where: { id: id } });
    if (results.length > 0) {
        let product = results[0];
        await product.destroy();
    }
    res.redirect('/');
}


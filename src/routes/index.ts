import { Router } from 'express';
import * as PageController from '../controllers/pageController';
import * as SearchController from '../controllers/searchController';
import multer from 'multer';

const storageConfig = multer.diskStorage({
    
    destination: (req, file, callback) =>{
        callback(null, './tmp');
    },
    filename(req, file, callback) {
        const randomName = Date.now() + '-' + Math.round(Math.random() * 1E9);
        callback(null, `${randomName}`);     
    }   
});

const upload = multer({
    storage: storageConfig,
    fileFilter: (req, file, cb)=>{
        const validations: string[] = ['image/jpg','image/jpeg','image/png']
        if(validations.includes(file.mimetype)){
            cb(null, true);
        }else{
            cb(null, false)
        }
    }
    
});
    
const router = Router();

router.get('/', PageController.home);
router.get('/earrings', PageController.earrings); 
router.get('/chains', PageController.chains)     
router.get('/rings', PageController.rings);
router.get('/novo-produto', PageController.addProduct);
router.post('/novo-produto-action', upload.single('image'), PageController.addProductAction);
router.get('/editar-produto/:id', PageController.updateProduct);
router.post('/editar-produto-action/:id', upload.single('image'), PageController.updateProductAction);
router.get('/editar-produto/:id', PageController.updateProduct);
router.get('/deletar-produto/:id', PageController.deleteProduct);
//router.get('/upload', PageController.upload);
//router.post('/upload-action', upload.single('image'), PageController.uploadAction);

router.get('/search', SearchController.search);


export default router;
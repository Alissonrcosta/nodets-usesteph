import { Router } from 'express';
import * as PageController from '../controllers/pageController';
import * as SearchController from '../controllers/searchController';
const router = Router();

router.get('/', PageController.home);
router.get('/earrings', PageController.earrings); 
router.get('/chains', PageController.chains)     
router.get('/rings', PageController.rings);
router.get('/novo-produto', PageController.addProduct);
router.post('/novo-produto-action', PageController.addProductAction);
router.get('/editar-produto/:id', PageController.updateProduct);
router.post('/editar-produto-action/:id', PageController.updateProductAction);

router.get('/search', SearchController.search);


export default router;
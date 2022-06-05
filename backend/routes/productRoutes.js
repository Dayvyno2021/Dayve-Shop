import express from 'express';
import { allProducts, singleProduct } from '../controllers/productController.js';
const router = express.Router();

router.route('/').get(allProducts);
router.route('/:id').get(singleProduct);


export default router
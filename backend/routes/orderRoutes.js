import express from 'express';
import { createOrder, myOrderDelete, myOrders, orderDetails, orderPay } from '../controllers/orderControllers.js';
import {protect} from '../middleware/authMiddleware.js'
const router = express.Router();


router.route('/create').post(protect, createOrder);
router.route('/:id').get(protect, orderDetails);
router.route('/:id/paid').put(protect, orderPay);
router.route('/orders/my-orders').get(protect, myOrders);
router.route('/my-order/delete/:id').delete(protect, myOrderDelete);

export default router;


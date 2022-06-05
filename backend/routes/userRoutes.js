import express from "express";
import { login, register, updateUser, userProfile } from "../controllers/usercontroller.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();


router.route('/register').post(register);
router.route('/login').post(login);
router.route('/profile').get(protect, userProfile)
router.route('/update/:id').post(protect, updateUser)

export default router;
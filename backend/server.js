import express  from "express";
import colors from 'colors';
import dotenv from 'dotenv';
import {connectDb} from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { notFound } from "./middleware/errorMiddleware.js";
dotenv.config();

connectDb();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res)=>{
  res.send('Website is working');
})

app.use('/api/products', productRoutes)
app.use('/api/user', userRoutes)

// app.use(errorHandler)
app.use(notFound);

const PORT = process.env.PORT || 5000
app.listen(PORT, () => 
console.log(`Server running in ${process.env.NODE_ENV} mode on PORT ${PORT}`.rainbow));
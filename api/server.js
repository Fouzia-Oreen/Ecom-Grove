// Packages
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import express from 'express';
import userRoutes from './routes/userRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js'
import productRoutes from "./routes/productRoutes.js";

dotenv.config();


// Utilities
import connectDB from './config/db.js';
const app = express();
const PORT = process.env.PORT || 5000;
connectDB();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

// Routes
app.use('/api/users', userRoutes)
app.use("/api/category", categoryRoutes);
app.use("/api/products", productRoutes);

// listening - port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
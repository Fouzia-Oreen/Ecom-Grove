// Packages
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import express from 'express';
import path from "path";
import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes from "./routes/productRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import userRoutes from './routes/userRoutes.js';
import brandRoutes from './routes/brandRoutes.js';
import subCategoryRoutes from './routes/subCategoryRoutes.js';
import  orderRoutes from './routes/orderRoutes.js';
import  headerRoutes from './routes/headerRoutes.js';

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
app.use("/api/brand", brandRoutes);
app.use("/api/subcategory", subCategoryRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/orders", orderRoutes );
app.use("/api/headers", headerRoutes );

app.get("/api/config/paypal", (req, res) => {
    res.send({ clientId: process.env.PAYPAL_CLIENT_ID });
});

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname + "/uploads")));


// listening - port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
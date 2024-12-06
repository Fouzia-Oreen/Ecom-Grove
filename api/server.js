// Packages
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import express from 'express';
import multer from "multer";
import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes from "./routes/productRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import userRoutes from './routes/userRoutes.js';
import brandRoutes from './routes/brandRoutes.js';


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
app.use("/api/upload", uploadRoutes);



// default error handler for multer and others
app.use((err, req, res, next) => {
    if (err ) {
        if (err instanceof multer.MulterError) {
            res.status(500).send("There was an error")
        } else {
            res.status(500).send(err.message)
        }   
    }       res.status(200).send({
    message: "Image uploaded successfully",
});
next()
})

// listening - port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
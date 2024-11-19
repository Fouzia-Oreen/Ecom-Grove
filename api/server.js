//import path from 'path'
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import express from 'express';
import userRoutes from './routes/userRoutes.js';
dotenv.config();


// Utils
import connectDB from './config/db.js';
const app = express();
const PORT = process.env.PORT || 5000;
connectDB();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

// routes
app.use('/api/user', userRoutes)


// listening - port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
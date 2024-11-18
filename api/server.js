import path from 'path'
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
dotenv.config();


// Utils
import connectDB from './config/db.js'
const app = express();
const PORT = process.env.PORT || 5000;
connectDB();


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser())

app.get('/get', (req, res) => {
  res.send('Hello World')
})


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
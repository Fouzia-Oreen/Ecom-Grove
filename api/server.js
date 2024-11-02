import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config()
const app = express();

mongoose
.connect(process.env.MONGO_URI)
.then(() => {
  console.log('Mongo db is connected');
})


const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log('Server is running on port 3000!');
  });
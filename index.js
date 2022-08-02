import express, { json } from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/user-routes.js';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(json());
app.use(cors());
app.use("/users", userRouter);

mongoose.connect(process.env.DB_CONNECT)
    .then(() => {
        console.log('Connected to MongoDB')
    })
    .then(() => {
        // console.log(`Server is running on port : ${process.env.PORT}`)
        app.listen(process.env.PORT);
    })
    .catch(err => console.log('Not able to connect to DB',err));
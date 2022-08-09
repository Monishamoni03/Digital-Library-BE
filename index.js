import express, { json } from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import userRouter from './routes/user-routes.js';
import bookRouter from './routes/book-routes.js';

dotenv.config();

const app = express();

app.use(bodyParser.json({extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(json());
app.use(cors());

app.use('/users', userRouter);
app.use('/books', bookRouter);

mongoose.connect(process.env.DB_CONNECT)
    .then(() => {
        console.log('Connected to MongoDB')
    })
    .then(() => {
        console.log(`Server is running on port : ${process.env.PORT}`)
        app.listen(process.env.PORT);
    })
    .catch(err => console.log('Not able to connect to DB',err));
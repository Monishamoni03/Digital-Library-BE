import express, { json } from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import userRouter from './routes/user-routes.js';
import bookRouter from './routes/book-routes.js';
import bookingRouter from './routes/booking-routes';

dotenv.config();

const app = express();

app.use(cookieParser());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));   //parse the incoming req with urlenc

app.use(json());
app.use(cors());

//routes
app.use('/users', userRouter);
app.use('/books', bookRouter);
app.use('/bookings', bookingRouter)

mongoose.connect(process.env.DB_CONNECT)
    .then(() => {
        console.log(`Connected to MongoDB, Server is running on port : ${process.env.PORT}`)
        app.listen(process.env.PORT);
    })
    .catch(err => console.log('Not able to connect to DB',err));
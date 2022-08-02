import express, { json } from 'express';
import userRouter from './routes/user-routes.js';
import dotenv from 'dotenv';
import cors from 'cors';
// import packages from 'mongoose';

// const { connect } = packages;
dotenv.config();

const app = express();
app.use(json());
app.use(cors());
app.use("/users", userRouter);

connect('mongodb://localhost:27017/Digital-Library')
    .then(() => {
        console.log('Connected to MongoDB')
    })
    .then(() => {
        // console.log(`Server is running on port : ${process.env.PORT}`)
        app.listen(process.env.PORT);
    })
    .catch(err => console.log('Not able to connect to DB',err));
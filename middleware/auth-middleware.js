import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../model/user';
import * as status from '../constants/status-code';

dotenv.config();

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.header('Authorization');
        // console.log("token : ",token)
        if (!token)
            throw "Please login to access."
        jwt.verify(token, process.env.SECRET_KEY, async (err, token) => {
            // const user = await User.findById(token.id)
            const user =  await User.find(token);
            req.user = user;
            next();
        });
    } catch (err) {
        return res.status(status.UNAUTHORIZED).json({ error: err })
    }
}   

export default isAuthenticated;
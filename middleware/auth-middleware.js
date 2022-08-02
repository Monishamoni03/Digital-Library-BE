import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../model/user';
import * as status from '../constants/status-code';

dotenv.config();

const userAuthentication = async (req, res, next) => {
    try {
        const token  = req.header('Authorization');
        if (!token)
            throw "Please login to access"
        const decodedData = jwt.verify(token, process.env.SECRET_KEY);

        if (req.params.id && decodedData.id !== req.params.id)
            throw "No access to view other user details"
        req.User = await User.findById(decodedData.id)
        next()
    } catch (err) {
        return res.status(status.UNAUTHORIZED).json({ error: err })
    }
}

export default userAuthentication;
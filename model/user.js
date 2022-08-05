import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const schemaUser = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    roleId: {
        type: mongoose.Types.ObjectId,
        ref: 'role',    //admin or user
        required: false
    }
});

schemaUser.methods.generateJsonWebToken = function() {
    return jwt.sign({ id:this._id }, process.env.SECRET_KEY,{
        expiresIn: '30m',
    });
}

export default mongoose.model("User", schemaUser);
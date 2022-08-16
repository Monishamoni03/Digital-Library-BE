import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const userSchema = new mongoose.Schema({
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
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    confirmPassword: {
        type: String,
        required: true,
    },
    roleId: {
        type: mongoose.Types.ObjectId,
        ref: 'roles',    //admin or user
        required: false
    }
});

userSchema.methods.generateJsonWebToken = function() {
    return jwt.sign({ id:this._id }, process.env.SECRET_KEY,{
        expiresIn: '30m',
    });
}

export default mongoose.model("User", userSchema);
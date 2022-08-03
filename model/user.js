import mongoose from 'mongoose';
import jwt from 'jsonwebtoken'
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
    },
    password: {
        type: String,
        required: true,
    },
    // role: {
    //     type: String,
    //     default: 'admin',
    //     required: false
    // }
});

userSchema.methods.generateJsonWebToken = function(){
    return jwt.sign({id:this._id, role: this.role},process.env.SECRET_KEY,{
        expiresIn:'1h',
    });
}

export default mongoose.model("User", userSchema);
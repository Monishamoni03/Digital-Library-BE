import mongoose from 'mongoose';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
// import role from './role';

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
    //     type: packages.Types.ObjectId,
    //     ref : 'role',
    //     required: false
    // }
});

userSchema.methods.generateJsonWebToken = function(){
    return jwt.sign({id:this._id},process.env.SECRET_KEY,{
        expiresIn:'1h',
    });
}

export default mongoose.model("User", userSchema);
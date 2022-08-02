import pkg from 'mongoose';
const { Schema, model } = pkg;
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
// import role from './role';

dotenv.config();
const schema = Schema;

const userSchema = new schema({
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
    // roleId: {
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

export default model("User", userSchema);
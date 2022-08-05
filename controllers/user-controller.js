import User from '../model/user.js';
import * as status from '../constants/status-code.js';
import bcrypt from 'bcrypt';
import tokenGenerate from '../utils/jwt-token';
import {registerValidation} from '../validation/SchemaValidation';
import {loginValidation} from '../validation/SchemaValidation';

class UserController {

    //register
    registerUser = async(req, res) => {
        try {
            console.log("req : ",req.body)
            let options = { abortEarly : false }
            const registerData = await registerValidation.validateAsync(req.body, options)
            console.log("registerData :",registerData)
            const { firstName, lastName, email, password, role } = registerData;
            let user = await User.findOne({ email: registerData.email })
            if(user)
              throw "Existing email id"

            const hashedPassword = await bcrypt.hash(password, 10)
            let roleId = await roleController.getRoleId(role, res);
            user = new User({
                firstName,
                lastName,
                email,
                password: hashedPassword,
                roleId
            });
            await user.save();
            return res.status.SUCCESS.json({ message: 'Successfully Registered', user })
        } catch (err) {
            if(err.isJoi === true) {
             const errors = []
             err.details.forEach(detail => {
             let error = {
                 [detail.path] : detail.message
             }
             errors.push(error)
             })
           //  return res.status.INTERNAL_SERVER_ERROR.json({ error: err})
            }
            console.log("error : ",err)
            return res.status(status.INTERNAL_SERVER_ERROR).json({ error: err })
        }
    }

    //login
    loginUser = async (req, res) => {
        const { email, password } = req.body;
        try {
           // let options = { abortEarly : false }
           // const loginData = await loginValidation.validateAsync({email, password}, options)
           // let roleId = await roleController.getRoleId(role, res);
            let user = await User.findOne({ email: email })
            if (!user)
                throw "This account does not exist"
            // if (user.roleId.toString() !== roleId)
            //     throw `This email not registered with ${role}'s role`
            if (! (bcrypt.compareSync( password,user.password)))
                throw "Incorrect password"
            tokenGenerate(user, status.SUCCESS, res, {message: 'Logged in successfully'})
        } catch (err) {
            return res.status(status.NOT_FOUND).json({ error: err })
        }
    }

    //view profile
    viewProfile = async (req, res) => {
        try {
            const userId = req.params.id;
            if(userId.length !== 20) 
               throw "Invalid ID"
            let user = await User.findById(userId).populate({ path: 'roleId' })
            if(user == null)
                throw "No user found, wrong ID"
            return res.status(status.SUCCESS).json({ user })
        } catch (err) {
            return res.status(status.NOT_FOUND).json({ error: err })
        }
    }

    //update profile
    updateProfile = async (req, res) => {
        try {
            const userId = req.params.id;
            if(userId.length !== 20) 
               throw "Invalid ID"
            let user = await User.findById(userId)
            if(user == null)
               throw "Unable to update the profile"
            let options = { abortEarly: false }
            const updateData = await registerValidation.validateAsync(req.body, options)
            const { firstName, lastName, email, password } = updateData;
            const hashedPassword = await bcrypt.hash(password, 10);
            user = await User.findByIdAndUpdate(userId, {
                firstName,
                lastName,
                email,
                password: hashedPassword
            })
            user = await user.save()
            return res.status(status.SUCCESS).json({ message: 'Updated Successfully'})
        } catch(err) {
            return res.status(status.NOT_FOUND).json({ error: err })
        }
    }

    //delete profile
    deleteProfile = async (req, res) => {
        try {
            const userId = req.params.id;
            if(userId.length !== 20) 
               throw "Invalid ID"
            let user = await User.findByIdAndDelete(userId)
            if(user == null)
               throw "Unable to delete the profile"
            return res.status(status.SUCCESS).json({ message: 'Deleted Successfully'})
        } catch(err) {
            return res.status(status.NOT_FOUND).json({ error: err })
        }
    }

    //get all user
    getAllUser = async (req, res) => {
        try {
            let users = await User.find();
            if(!users) 
              throw "No users found"
            return res.status(status.SUCCESS).json({ users })
        } catch(err) {
            return res.status(status.NOT_FOUND).json({ error: err })
        }
    }
}

export default UserController;
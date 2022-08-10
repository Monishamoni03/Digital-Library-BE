import User from '../model/user.js';
import Role from '../model/role'
import * as status from '../constants/status-code.js';
import bcrypt from 'bcrypt';
import sendRoleToken from '../utils/jwt-token';
import BaseController from './base-controller';
import {registerValidation} from '../validation/UserValidationSchema';
import {loginValidation} from '../validation/UserValidationSchema';

const baseContoller = new BaseController();
let user;

class UserController {

    //register
    registerUser = async(req, res) => {
        try {
            let options = { abortEarly : false }
            const { firstName, lastName, email, password, roles } = req.body
            const registerData = await registerValidation.validateAsync({ firstName, lastName, email, password }, options)
            // const { firstName, lastName, email, password } = registerData;
            console.log("Reg", registerData);
            user = await User.findOne({ email: registerData.email })
            if(user)
              throw "Existing email id"

            const hashedPassword = await bcrypt.hash(password, 10)
            console.log(roles)
            let roleId = await baseContoller.getRoleId(roles, res);
            console.log(roleId)
            user = new User({
                firstName,
                lastName,
                email,
                password: hashedPassword,
                roleId
            });
            await user.save();
            return res.status(status.SUCCESS).json({ message: 'Successfully Registered' })    
        } catch (err) {
            console.log(err); 
            if(err.isJoi === true) {
             const errors = []
             err.details.forEach(detail => {
             let error = {
                 [detail.path] : detail.message
             }
             errors.push(error)
             })
            }
            console.log("error : ",err)
            return res.status(status.INTERNAL_SERVER_ERROR).json({ error: err })
        }
    }

    //login
    loginUser = async (req, res) => {
        try {
            const { email, password } = req.body;
            console.log("REQ : ", req.body)
            let options = { abortEarly : false }
            const loginData = await loginValidation.validateAsync({email, password}, options)
            // let roleId = await baseContoller.getRoleId(roles, res);
            // console.log(roleId);
            let user = await User.findOne({ email: loginData.email })
            console.log("role", user.roleId);
            let role = await Role.findById(user.roleId)
            console.log("Role : ", role.name);
            // console.log("pass", user.roleId.toString());
            if (!user)
                throw "This account does not exist"
          //  if (user.roleId.() !== roleId)
          //      throw `This email not registered with ${roles}'s role`
            if (! (bcrypt.compareSync( loginData.password,user.password)))
                throw "Incorrect password"
            sendRoleToken(user, status.SUCCESS, res, {message: 'Logged in successfully', role: role.name})
        } catch (err) {
            console.log("ERROR : ", err);
            return res.status(status.NOT_FOUND).json({ error: err })
        }
    }

    //view profile
    viewProfile = async (req, res) => {
        try {
            const id = req.params.id;
            if(id.length !== status.ID) 
               throw "Invalid ID"
            user = await User.findById(id).populate({ path: 'roleId' })
            if(!user)
                throw "No user found, wrong ID"
            return res.status(status.SUCCESS).json({ user })
        } catch (err) {
            return res.status(status.NOT_FOUND).json({ error: err })
        }
    }

    //update profile
    updateProfile = async (req, res) => {
        try {
            const id = req.params.id;
            if(id.length !== status.ID) 
               throw "Invalid ID"
            user = await User.findById(id)
            if(!user)
               throw "Unable to update the profile"
            let options = { abortEarly: false }
            const updateData = await registerValidation.validateAsync(req.body, options)
            const { firstName, lastName, email, password } = updateData;
            const hashedPassword = await bcrypt.hash(password, 10);
            user = await User.findByIdAndUpdate(id, {
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
            const id = req.params.id;
            if(id.length !== status.ID) 
               throw "Invalid ID"
            user = await User.findByIdAndDelete(id)
            if(!user)
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
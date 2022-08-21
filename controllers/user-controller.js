import User from '../model/user.js';
import Role from '../model/role'
import * as status from '../constants/status-code.js';
import * as constants from '../constants/constants';
import bcrypt from 'bcrypt';
import generateToken from '../utils/jwt-token';
// import BaseController from './base-controller';
import AbstractBaseController from './base-controller';
import { registerValidation } from '../validation/user-validation-schema';
import { loginValidation } from '../validation/user-validation-schema';

// const baseContoller = new BaseController();

class BaseController extends AbstractBaseController {
    constructor() {
        super()
    }

    //role -> user / admin
    getRoleId = async (value, res) => {
        try {
            const role = await Role.findOne({ name: value })
            console.log("ROLE : ", role);
            if (!role)
                throw "Please mention the role"
            return role._id.toString()
        } catch (err) {
            return res.status(err);
        }
    }

    //book category id
    getBookCategoryId = async (value, res) => {
        try {
            const category = await BookCategory.findOne({ category: value })
            if (!category)
                throw "This type of book category is not available"
            return category._id.toString()
        } catch (err) {
            return res.status(status.NOT_FOUND).json({ error: err })
        }
    }
}

const baseContoller = new BaseController(); 

class UserController {

    //register
    registerUser = async (req, res) => {
        try {
            let options = { abortEarly: false }
            const { firstName, lastName, email, password, confirmPassword } = req.body
            const registerData = await registerValidation.validateAsync({ firstName, lastName, email, password, confirmPassword }, options)
            console.log("Reg", registerData);
            let user = await User.findOne({ email: registerData.email })
            if (user)
                throw "Existing email id"
            const hashedPassword = await bcrypt.hash(password, 10)
            const hashedconfirmPassword = await bcrypt.hash(confirmPassword, 10)

            let roleId = await baseContoller.getRoleId(constants.ROLES, res);
            let role = await Role.findById(roleId)
            // console.log("Role : ", role.name);
            user = new User({
                firstName,
                lastName,
                email,
                password: hashedPassword,
                confirmPassword: hashedconfirmPassword,
                roleId
            });
            await user.save();
            generateToken(user, status.SUCCESS, res, role.name, { message: 'Successfully Registered' })
            // return res.status(status.SUCCESS).json({ message: 'Successfully Registered' })    
        } catch (err) {
            console.log(err);
            if (err.isJoi === true) {
                const errors = []
                err.details.forEach(detail => {
                    let error = {
                        [detail.path]: detail.message
                    }
                    errors.push(error)
                })
            }
            console.log("error : ", err)
            return res.status(status.INTERNAL_SERVER_ERROR).json({ error: err })
        }
    }

    //login
    loginUser = async (req, res) => {
        try {
            const { email, password } = req.body;
            console.log("REQ : ", req.body)
            let options = { abortEarly: false }
            const loginData = await loginValidation.validateAsync({ email, password }, options)
            const user = await User.findOne({ email: loginData.email })

            if (!user)
                throw "Email does not exist"

            let role = await Role.findById(user.roleId)
            // console.log("Role : ", role.name);
            if (!user)
                throw "This account does not exist"
            if (!(bcrypt.compareSync(loginData.password, user.password)))
                throw "Incorrect password"
            generateToken(user, status.SUCCESS, res, role.name, { message: 'Logged in successfully' })
        } catch (err) {
            console.log("ERROR : ", err);
            return res.status(status.NOT_FOUND).json({ error: err })
        }
    }

    //view profile
    viewProfile = async (req, res) => {
        try {
            const id = req.params.id;
            if (id.length !== status.ID)
                throw "Invalid ID"
            const user = await User.findById(id).populate({ path: 'roleId' })
            if (!user)
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
            if (id.length !== status.ID)
                throw "Invalid ID"
            const user = await User.findById(id)
            if (!user)
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
            return res.status(status.SUCCESS).json({ message: 'Updated Successfully' })
        } catch (err) {
            return res.status(status.NOT_FOUND).json({ error: err })
        }
    }

    //delete profile
    deleteProfile = async (req, res) => {
        try {
            const id = req.params.id;
            if (id.length !== status.ID)
                throw "Invalid ID"
            const user = await User.findByIdAndDelete(id)
            if (!user)
                throw "Unable to delete the profile"
            return res.status(status.SUCCESS).json({ message: 'Deleted Successfully' })
        } catch (err) {
            return res.status(status.NOT_FOUND).json({ error: err })
        }
    }

    //get all user
    getAllUser = async (req, res) => {
        try {
            let users = await User.find();
            if (!users)
                throw "No users found"
            return res.status(status.SUCCESS).json({ users })
        } catch (err) {
            return res.status(status.NOT_FOUND).json({ error: err })
        }
    }
}

export default UserController;
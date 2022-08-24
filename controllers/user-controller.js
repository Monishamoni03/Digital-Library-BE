import User from '../model/user.js';
import Role from '../model/role';
import * as status from '../constants/status-code.js';
import * as constants from '../constants/constants';
import bcrypt from 'bcrypt';
import generateToken from '../utils/jwt-token';
import BaseController from './base-controller';
import { registerValidation } from '../validation/user-validation-schema';
import { loginValidation } from '../validation/user-validation-schema';

const baseContoller = new BaseController();

class UserController {

    //register -> user
    registerUser = async (req, res) => {
        try {
            let options = { abortEarly: false }
            const { firstName, lastName, email, password, confirmPassword } = req.body;
            const registerData = await registerValidation.validateAsync({ firstName, lastName, email, password, confirmPassword }, options);
            let user = await User.findOne({ email: registerData.email })
            if (user)
                throw "Existing email id"
            const hashedPassword = await bcrypt.hash(password, 10);

            let roleId = await baseContoller.getRoleId(constants.USER_ROLE, res);
            user = new User({
                firstName,
                lastName,
                email,
                password: hashedPassword,
                roleId
            });
            await user.save();
            generateToken(user, status.SUCCESS, res, constants.USER_ROLE, { message: 'Successfully Registered' })  
        } catch (err) {
            if (err.isJoi === true) {
                const errors = []
                err.details.forEach(detail => {
                    let error = {
                        [detail.path]: detail.message
                    }
                    errors.push(error)
                })
            }
            return res.status(status.INTERNAL_SERVER_ERROR).json({ error: err })
        }
    }

    //login -> admin/user
    loginUser = async (req, res) => {
        try {
            const { email, password } = req.body;
            let options = { abortEarly: false }
            const loginData = await loginValidation.validateAsync({ email, password }, options);
            const user = await User.findOne({ email: loginData.email })

            if (!user)
                throw "Email does not exist"
            let role = await Role.findById(user.roleId);
            if (!(bcrypt.compareSync(loginData.password, user.password)))
                throw "Incorrect password"
            generateToken(user, status.SUCCESS, res, role.name, { message: 'Logged in successfully' })
        } catch (err) {
            return res.status(status.NOT_FOUND).json({ error: err })
        }
    }

    //view profile
    viewProfile = async (req, res) => {
        try {
            const id = req.params.id;
            if (id.length !== status.OBJECT_ID)
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
            if (id.length !== status.OBJECT_ID)
                throw "Invalid ID"
            const user = await User.findById(id)
            if (!user)
                throw "Unable to update the profile"
            let options = { abortEarly: false }
            const updateData = await registerValidation.validateAsync(req.body, options)
            const { firstName, lastName, email } = updateData;
            user = await User.findByIdAndUpdate(id, {
                firstName,
                lastName,
                email,
            })
            user = await user.save()
            return res.status(status.SUCCESS).json({ message: 'Profile Updated Successfully' })
        } catch (err) {
            return res.status(status.NOT_FOUND).json({ error: err })
        }
    }

    //delete profile
    deleteProfile = async (req, res) => {
        try {
            const id = req.params.id;
            if (id.length !== status.OBJECT_ID)
                throw "Invalid ID"
            const user = await User.findByIdAndDelete(id)
            if (!user)
                throw "Unable to delete the profile"
            return res.status(status.SUCCESS).json({ message: 'Profile Deleted Successfully' })
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
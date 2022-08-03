import User from '../model/user.js';
import * as status from '../constants/status-code.js';
import bcrypt from 'bcrypt';
import tokenGenerate from '../utils/jwt-token';
import registerValidation from '../validation/SchemaValidation';
import loginValidation from '../validation/SchemaValidation';

class UserController {

    //register
    registerUser = async (req, res) => {
        try {
            let options = { abortEarly : false }
            const registerData = await registerValidation.validateAsync(req.body, options)
            const { firstName, lastName, email, password } = registerData;
            if (await User.findOne({ email: email })) {
                throw "Existing email id"
            }
            const hashedPassword = await bcrypt.hash(password, 10)
            let user = new User({
                firstName,
                lastName,
                email,
                password: hashedPassword,
            });
            await user.save();
            return res.status(200).json({ message: 'Successfully Registered', user })
        } catch (err) {
            return res.status(status.INTERNAL_SERVER_ERROR).json({ error: err })
        }
    }

    //login
    loginUser = async (req, res) => {
        const { email, password } = req.body;
        try {
            let options = { abortEarly : false }
            const loginData = await loginValidation.validateAsync({email, password, role}, options)
            let user = await User.findOne({ email: loginData.email })

            if (!user)
                throw "This account does not exist"
            if (! (bcrypt.compareSync(loginData.password, user.password)))
                throw "Incorrect password"
            const message = "Logged in successfully"
            tokenGenerate(user, status.SUCCESS, res, message)
        } catch (err) {
            return res.status(status.NOT_FOUND).json({ error: err })
        }
    }

    //view profile
    viewProfile = async (req, res) => {
        try {
            const userId = req.params.userId;
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
            const userId = req.params.userId;
            if(userId.length !== 20) 
               throw "Invalid ID"
            let user = await User.findById(userId)
            if(user == null)
               throw "Unable to update the profile"
            let options = { abortEarly: false }
            const updateData = await userValidation.validateAsync(req.body, options)
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
            const userId = req.params.userId;
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

}

export default UserController;
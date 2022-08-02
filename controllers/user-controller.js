import User from '../model/user.js';
import * as status from '../constants/status-code.js';
import bcrypt from 'bcrypt';
import tokenGenerate from '../utils/jwt-token';
import registerValidation from '../validation/SchemaValidation';
import loginValidation from '../validation/SchemaValidation';


class UserController {

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
            let message = "Successfully Registered"
            return res.status(200).json({ message: message, user })
        } catch (err) {
            return res.status(status.INTERNAL_SERVER_ERROR).json({ error: err })
        }
    }

    loginUser = async (req, res, next) => {
        const { email, password } = req.body;
        try {
            let options = { abortEarly : false }
            const loginData = await loginValidation.validateAsync({email, password}, options)
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
}

export default UserController;
import User from '../model/user.js';
import * as status from '../constants/status-code.js';
import bcrypt from 'bcrypt';
import tokenGenerate from '../utils/jwt-token';

class UserController {

    registerUser = async (req, res) => {
        try {
            const { firstName, lastName, email, password } = req.body;
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
        try {
            const { email, password } = req.body;
            let user = await User.findOne({ email: email })

            if (!user)
                throw "This account does not exist"
            if (!(bcrypt.compareSync(password, user.password)))
                throw "Incorrect password"
            const message = "Logged in successfully"
            tokenGenerate(user, status.SUCCESS, res, message)
        } catch (err) {
            return res.status(status.NOT_FOUND).json({ error: err })
        }
    }
}

export default UserController;
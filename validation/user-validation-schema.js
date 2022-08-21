import Joi from "joi";
import * as regex from '../constants/constants';

const registerValidation = Joi.object({
    firstName: Joi.string()
        .pattern(new RegExp(regex.NAME_REGEX))
        .required(),

    lastName: Joi.string()
        .pattern(new RegExp(regex.NAME_REGEX))
        .required(),

    email: Joi.string()
        .email()
        .pattern(new RegExp(regex.EMAIL_REGEX))
        .required(),

    password: Joi.string()
        .pattern(new RegExp(regex.PASSWORD_REGEX))
        .required(),
    confirmPassword: Joi.ref('password')
})

const loginValidation = Joi.object({
    email: Joi.string()
        .email()
        .pattern(new RegExp(regex.EMAIL_REGEX))
        .required(),

    password: Joi.string()
        .pattern(new RegExp(regex.PASSWORD_REGEX))
        .required()
})

export {
    registerValidation,
    loginValidation
}

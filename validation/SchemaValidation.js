import Joi from "joi";

const registerValidation = Joi.object({
    firstName: Joi.string()
                  .pattern(new RegExp(/^[a-zA-Z]{2,15}$/))
                  .required(),

    lastName: Joi.string()
                  .pattern(new RegExp(/^[a-zA-Z]{2,15}$/))
                  .required(),


    email: Joi.string()
                 .email()
                 .pattern(new RegExp(/^([a-zA-Z0-9_\.\-]+)@([a-zA-Z]+)\.([a-zA-Z]{2,5})$/))
                 .required(),

    password: Joi.string()
                 .pattern(new RegExp(/^[A-Za-z0-9]{6,15}$/))
                 .required()

})

const loginValidation = Joi.object({
    email: Joi.string()
                 .email()
                 .pattern(new RegExp(/^([a-zA-Z0-9_\.\-]+)@([a-zA-Z]+)\.([a-zA-Z]{2,5})$/))
                 .required(),

    password: Joi.string()
                 .pattern(new RegExp(/^[A-Za-z0-9]{6,15}$/))
                 .required()
})


export default {registerValidation, loginValidation}

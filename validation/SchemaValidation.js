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

<<<<<<< HEAD
export default {registerValidation, loginValidation}
=======
export default { registerValidation, loginValidation }
>>>>>>> d4a91a0a205f5e8b566d550bc3fe272af6f9719f

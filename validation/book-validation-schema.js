import Joi from "joi";

const bookValidation = Joi.object({
    bookName: Joi.string()
        .required(),

    author: Joi.string()
        .required(),
        
    category: Joi.string()
        .required()
}) 

export { bookValidation };
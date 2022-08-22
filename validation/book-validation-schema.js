import Joi from "joi";
import * as regex from '../constants/constants';

const bookValidation = Joi.object({
    bookName: Joi.string()
        .pattern(new RegExp(regex.BOOKNAME_REGEX))   
        .required(),

    author: Joi.string()
        .pattern(new RegExp(regex.NAME_REGEX))
        .required(),
        
    category: Joi.string()
        .pattern(new RegExp(regex.NAME_REGEX))
        .required(),
        
    description: Joi.string()
        // .pattern(new RegExp(regex.BOOKNAME_REGEX))
        .required()
}) 

export { bookValidation };
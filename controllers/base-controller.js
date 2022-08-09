import Role from '../model/role';
import BookCategory from '../model/book-category';
import * as status from '../constants/status-code';

let role, category = [];
class BaseController {

    //role -> user / admin
    getRoleId = async (value, res) => {
        try {
            role = await Role.findOne({ roles: value })
            
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
            category = await BookCategory.findOne({ category: value })
            if(!category) 
                throw "Book category not available"
            return category._id.toString()
        } catch (err) {
            return res.status(status.NOT_FOUND).json({ error: err })
        }
    }
    
}

export default BaseController;
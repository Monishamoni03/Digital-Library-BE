import Role from '../model/role';
import User from '../model/user';
import Book from '../model/book';
import BookCategory from '../model/book-category';
import * as status from '../constants/status-code';

class BaseController {

    getRoleId = async (value, res) => {
        try {
            let role = await Role.findOne({ roleId: value })
            
            if (!role)
                throw "Please mention the role"
            return role._id.toString()
        }
        catch (err) {
            return res.status(err);
        }
    }
    
}

export default BaseController;
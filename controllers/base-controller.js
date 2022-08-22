import Role from '../model/role';
import BookCategory from '../model/book-category';
import * as status from '../constants/status-code';

class BaseController {

  //role -> user / admin
  getRoleId = async (value, res) => {
    try {
      const role = await Role.findOne({ name: value })
      console.log("ROLE : ", role);
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
      const category = await BookCategory.findOne({ category: value })
      if (!category)
        throw "This type of book category is not available"
      return category._id.toString()
    } catch (err) {
      return res.status(status.NOT_FOUND).json({ error: err })
    }
  }

}

export default BaseController;
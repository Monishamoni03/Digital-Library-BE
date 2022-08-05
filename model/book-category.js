import mongoose from "mongoose";

const bookCategorySchema = new mongoose.Schema ({
    categoryId: {
        type: String,
        required: true
    }
})

export default mongoose.model('Book Category', bookCategorySchema);
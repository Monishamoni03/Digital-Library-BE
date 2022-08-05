import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
    bookId: {
      type: String,
      required: true
    },
    bookName: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book Category'
    },
  },
);

export default mongoose.model('Book', bookSchema);
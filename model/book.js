import mongoose from 'mongoose';

const BookSchema = new mongoose.Schema(
    {
        category: {
            type: String,
            required: true,
          },
          author: {
            type: String,
            required: true,
          },
          title: {
            type: String,
          },
          // createdBy: {
          //   type: mongoose.Schema.Types.ObjectId,
          //   ref: 'Book',
          //   required: true,
          // },
    },
    // { timestamps: true }   //creating a book it will give us the date when book was created and when it s updated
);

export default mongoose.model('Book', BookSchema);
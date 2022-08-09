import Book from '../model/book';
import * as status from '../constants/status-code.js';
import BaseController from './base-controller';
import BookCategory from '../model/book-category';

let book, booksId, bookCategory; 
// let baseController = new BaseController();

class BookControllers {  ///change to BookController

    //get books
    getBooks = async (req, res, next) => {
        try {
            book = await Book.find();
            res.json(book);
        } catch (err) {
            return res.status(status.NOT_FOUND).json({ error: err });
        }
    }

    //create books
    addBook = async (req, res) => {
        try {
          let { bookId, bookName, author, category } = req.body;
            if (await Book.findOne({ bookName: bookName })) {
                throw "This Book Name already exists"
            }

            // let bookCategoryId = await baseController.getBookCategoryId( category, res)
            book = new Book({
                bookId,
                bookName,
                author,
                category,
                // bookCategoryId,  //book id 
            });
            await book.save();

            return res.status(status.CREATED).json({ message: 'Successfully Book Created', book })
            // return res.status(status.CREATED).json({ message: "Successfully Book added" })
        } catch (error) {
            return res.status(status.INTERNAL_SERVER_ERROR).json({ error: error })
        }
    }

    //update book
    updateBook = async (req, res) => {
        try {
           let { bookId, bookName, author, categoryId } = req.body;
            booksId = req.params.id;

            if(booksId.length !== status.ID) 
               throw "Invalid ID"
            
            if (! await Book.findById(booksId))
                throw "No books available with this entered Id"

            book = await Book.findByIdAndUpdate(booksId, {
                bookId,
                bookName,
                author,
                categoryId,
            })

            await book.save()

            return res.status(status.SUCCESS).json({ message: "Updated the book successfully" })
        } catch (err) {
            return res.status(status.INTERNAL_SERVER_ERROR).json({ error: err })
        }
    }

    //delete book
    deleteBook = async (req, res) => {
        try {
            booksId = req.params.id;

            if(booksId.length !== status.ID) 
               throw "Invalid ID"
            book = await Book.findByIdAndDelete(booksId)
            if(!book)
               throw "Unable to delete the book"

            return res.status(status.SUCCESS).json({ message: 'Deleted the book successfully'})
        } catch(err) {
            return res.status(status.NOT_FOUND).json({ error: err })
        }
    }

    //get books based on category id
    getBookCategory = async (req, res) => {
        try {
            bookCategory = await BookCategory.find()

            if (!bookCategory)
                throw "No book category available"

            return res.status(status.SUCCESS).json({ bookCategory })
        } catch (err) {
            return res.status(status.NOT_FOUND).json({ error: err })
        }
    }
}

export default BookControllers;






// import Book from '../model/book';
// import * as status from '../constants/status-code.js';
 
// class BookController {

//     //get all book
//     getAllBook = async (req, res, next) => {
//         try {
//             // let book = await Book.find().populate({path:'category'});
//             let book = await Book.find()
//             res.json(book);
//         } catch (err) {
//             return res.status(status.NOT_FOUND).json({ error: err })
//         }
//     }

//     //add book
//     addBook = async (req, res) => {
//         try {
//             const { category, author, title } = req.body;
//             if (await Book.findOne({ title: title })) {
//               throw "This Title already exists"
//             }
//             let book = new Book({
//                category,
//                author,
//                title,
//         });
//         await book.save()
//         return res.status(200).json({ message: 'Successfully Book Created', book })
//         // return res.status(status.CREATED).json({ message: "Successfully Book added" })
//         } catch (error) {
//             return res.status(status.INTERNAL_SERVER_ERROR).json({ error: error })
//         }
//     }

//     //view book
//     viewBook = async (req, res) => {
//         try {
//             const bookId = req.params.id;
//             if(bookId.length !== 24) 
//                throw "Invalid ID"
//             let book = await Book.findById(bookId)
//             if(book == null)
//                 throw "No book found, wrong ID"
//             return res.status(status.SUCCESS).json({ book })
//         } catch (err) {
//             return res.status(status.NOT_FOUND).json({ error: err })
//         }
//     }

//     //update book
//     updateBook = async (req, res) => {
//         try {
//             const { category, author, title } = req.body;
//             let bookId = req.params.id;

//             if(bookId.length !== 24) 
//                throw "Invalid ID"
            
//                if (! await Book.findById(bookId))
//                 throw "No Product Available With this Given Product Id"

//             let book = await Book.findByIdAndUpdate(bookId, {
//                 category,
//                 author,
//                 title
//             })

//             await book.save()
//             return res.status(status.SUCCESS).json({ message: "Updated the book successfully" })
//         } catch (err) {
//             return res.status(status.INTERNAL_SERVER_ERROR).json({ error: err })
//         }
//     }

//     //delete book
//     deleteBook = async (req, res) => {
//         try {
//             const bookId = req.params.bookId;
//             if(bookId.length !== 20) 
//                throw "Invalid ID"
//             let book = await Book.findByIdAndDelete(bookId)
//             if(book == null)
//                throw "Unable to delete the book"
//             return res.status(status.SUCCESS).json({ message: 'Deleted Successfully'})
//         } catch(err) {
//             return res.status(status.NOT_FOUND).json({ error: err })
//         }
//     }
// }

// export default BookController;
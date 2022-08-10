import Book from '../model/book.js';
import * as status from '../constants/status-code.js';

class BookController {

    //get all books 
    getBooks = async (req, res) => {
        try { 
            const books = await Book.find();
            res.status(status.SUCCESS).json(books);
            // res.status(status.SUCCESS).json({ message: 'All Book information: '},books);
        } catch( error ){
            res.status(status.NOT_FOUND).json({ message: error.message })
        }
    }

    //add books ->  saving data of books in DB
    addBook = async (req, res) => {
        try {
            const book = new Book(req.body.book);
            console.log(book);
            await book.save();
            res.status(status.CREATED).json(book);
            // res.status(status.CREATED).json({ message: 'Successfully Book Created'}, newBook );
        } catch (error) {
            res.status(status.NOT_FOUND).json({ message: error.message});     
        }
    }

    //edit books
    editBook = async (req, res) => {
        try {
            let editBook = new Book(req.body.editBook);
            await Book.updateOne({_id: req.params.id}, editBook);
            res.status(status.SUCCESS).json(editBook);
          //  res.status(status.SUCCESS).json({ message: 'Updated Successfully'}, editBook);
        } catch (error){
            res.status(status.NOT_FOUND).json({ message: error.message});     
        }
    }

    //delete books
    deleteBook = async (req, res) => {
        try {
            await Book.deleteOne({_id: req.params.id});
            res.status(status.SUCCESS).json("Book deleted successfully");
        } catch (error){
            res.status(status.NOT_FOUND).json({ message: error.message});     
        }
    }

    //get book based on id
    getBookById = async (req, res) => {
        try {
            const book = await Book.findById(req.params.id);
            res.status(status.SUCCESS).json(book);
        }catch( error ){
            res.status(status.NOT_FOUND).json({ message: error.message })
        }
    }
    
}

export default BookController;
import Book from '../model/book';
import * as status from '../constants/status-code.js';
import Booking from '../model/bookings';

class BookController {

    //get all books 
    getBooks = async (req, res) => {
        try { 
            const books = await Book.find();
            res.status(status.SUCCESS).json(books);
           
        } catch( error ){
            res.status(status.NOT_FOUND).json({ message: error.message })
        }
    }

    //add books ->  saving data of books in DB
    addBook = async (req, res) => {
        try {
            const book = req.body;
            const newBook = new Book(book);
            // const book = new Book(req.body.book);
            // console.log(book);
            await newBook.save();
            res.status(status.CREATED).json(newBook);
          
        } catch (error) {
            res.status(status.NOT_FOUND).json({ message: error.message});     
        }
    }

    //edit books
    editBook = async (req, res) => {
        try {
            const book = req.body;
            const editBook = new Book(book);
            //let editBook = new Book(req.body.editBook);
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
    //add book to list
    addBookToList = async (req, res) => {
        try {
            let existingUserBooking = await Booking.find({ user : req.body.user, book : req.body.book })
            if(existingUserBooking.length === 1 && existingUserBooking[0].user.toString() === req.body.user)
                throw 'Already book has been added to your list'
            let existingBookings = await Booking.find({ book : req.body.book })
            if(existingBookings.length === 1)
                throw 'Already book has been added by other user'
            const userBooking = new Booking(req.body)
            await userBooking.save()
            res.status(status.SUCCESS).json({message : 'succesfully book has been added to the list'})
        }catch( error ){
            res.status(status.NOT_FOUND).json({ message : error })
        }
        
    }

}

export default BookController;
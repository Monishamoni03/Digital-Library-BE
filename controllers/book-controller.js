import Book from '../model/book';
import * as status from '../constants/status-code.js';
import Booking from '../model/bookings';
import { bookValidation } from '../validation/book-validation-schema';
import bookings from '../model/bookings';

class BookController {

    //admin-> get all books 
    getBooks = async (req, res) => {
        try { 
            const books = await Book.find();
            res.status(status.SUCCESS).json(books);          
        } catch( error ){
            res.status(status.NOT_FOUND).json({ message: error.message })
        } 
    }
    
    //admin-> add books
    addBook = async (req, res) => {
        try {
            let options = { abortEarly: false }
            const { bookName, author, category, description } = req.body
            const validatedData = await bookValidation.validateAsync({ bookName, author, category, description }, options)
            console.log("Adding books", validatedData);
            let book = await Book.findOne({ bookName: validatedData.bookName })
            if (book)
                throw "Existing book name"
            book = new Book({
                bookName,
                author,
                category,
                description
            });
           
            await book.save();
            return res.status(status.CREATED).json(book)    
        } catch (err) {
            console.log(err); 
            if(err.isJoi === true) {
             const errors = []
             err.details.forEach(detail => {
             let error = {
                [detail.path] : detail.message
             }
             errors.push(error)
             })
            }
            console.log("error : ",err)
            return res.status(status.NOT_FOUND).json({ error: err })
        }
    }

    //add books ->  saving data of books in DB
    // addBook = async (req, res) => {
    //     try {
    //         const book = req.body;
    //         const newBook = new Book(book);
    //         // const book = new Book(req.body.book);
    //         // console.log(book);
    //         await newBook.save();
    //         res.status(status.CREATED).json(newBook);
          
    //     } catch (error) {
    //         res.status(status.NOT_FOUND).json({ message: error.message });     
    //     }
    // }

    //admin-> edit books
    editBook = async (req, res) => {
        try {
            let options = { abortEarly: false }
            const { bookName, author, category, description } = req.body
            const validatedData = await bookValidation.validateAsync({ bookName, author, category, description }, options)
            console.log("Editing books", validatedData);
            const book = req.body;
            const editBook = new Book(book);
            await Book.updateOne({_id: req.params.id}, editBook);
            res.status(status.SUCCESS).json(editBook);
            // let book = await Book.findOne({ bookName: validatedData.bookName })
            // if (book)
            //     throw "Existing book name"
            // book = new Book({
            //     bookName,
            //     author,
            //     category,
            //     description
            // });
           
            // await book.save();
            // return res.status(status.CREATED).json(book)    
        } catch (err) {
            console.log(err); 
            if(err.isJoi === true) {
             const errors = []
             err.details.forEach(detail => {
             let error = {
                [detail.path] : detail.message
             }
             errors.push(error)
             })
            }
            console.log("error : ",err)
            return res.status(status.NOT_FOUND).json({ error: err })
        }
    }

    // editBook = async (req, res) => {
    //     try {
    //         const book = req.body;
    //         const editBook = new Book(book);
    //         //let editBook = new Book(req.body.editBook);
    //         await Book.updateOne({_id: req.params.id}, editBook);
    //         res.status(status.SUCCESS).json(editBook);
    //     } catch (error){
    //         res.status(status.NOT_FOUND).json({ message: error.message });     
    //     }
    // }

    //admin-> delete books
    deleteBook = async (req, res) => {
        try {
            const book = await Booking.find({ book:req.params.id });
            console.log(req.params.id)
            console.log("book",book)
            if(book.length>0){
                throw "Book has been booked by a user"
            }
            await Book.deleteOne({_id: req.params.id});
            res.status(status.SUCCESS).json("Book deleted successfully");
        } 
        catch (error){ 
            res.status(status.NOT_FOUND).json({ message: error });     
        }
    }

    //admin-> get book based on id
    getBookById = async (req, res) => {
        try {
            const book = await Book.findById(req.params.id);
            res.status(status.SUCCESS).json(book);
        } catch( error ){
            res.status(status.NOT_FOUND).json({ message: error.message })
        }
    } 

    //user-> add book to list
    addBookToList = async (req, res) => {
        console.log("Req : ",req.body)
        try {
            let existingUserBooking = await Booking.find({ user : req.body.user, book : req.body.book })
            if(existingUserBooking.length === 1 && existingUserBooking[0].user.toString() === req.body.user)
                throw 'Already book has been added to your list'
            let existingBookings = await Booking.find({ book : req.body.book })
            if(existingBookings.length === 1)
                throw 'Already book has been added by other user. Kindly choose another book.'
            const userBooking = new Booking(req.body)
            await userBooking.save()
            res.status(status.SUCCESS).json({message : 'Successfully book has been added to your list'})
        } catch( error ){
            res.status(status.NOT_FOUND).json({ message : error })
        }
        
    }

}

export default BookController;

 // const userBookings = await Booking.find({ user : req.params.id }).populate( { path : 'book', path : 'user'})
            // if(userBookings.length > 0)
            //     throw "Book has been already booked by a user"
            // let user = await Book.find({ _id: req.params.id });
            // if(user.length > 0) 
            //     throw "Book has been already by a user"
            // if user added to my list, admin should not delete that user added book

            // let existingUserBooking = await Booking.find({ user : req.body.user, book : req.body.book })
            // if( existingUserBooking.length === 1)
            //     throw "You can't delete. User added this book to their list"

            //////////
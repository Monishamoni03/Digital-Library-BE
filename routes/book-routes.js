import { Router } from 'express';
import bookController from '../controllers/book-controller';

const router = Router();
const book = new bookController();

router.get('/', book.getBooks); //all books
router.post('/add', book.addBook);  //create book
router.put('/:id', book.editBook);  //update / edit book
router.delete('/:id', book.deleteBook); //delete book
router.get('/:id', book.getBookById); //get book by id
router.post('/add-list', book.addBookToList); //add book to list
// router.get('/book-category', book.getBookCategory); //get books based on category

export default router;
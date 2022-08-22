import { Router } from 'express';
import bookController from '../controllers/book-controller';
import isAuthenticated from '../middleware/auth-middleware';

const router = Router();
const book = new bookController();

router.get('/', isAuthenticated, book.getBooks); //all books  --> admin, user
router.post('/add', isAuthenticated, book.addBook);  //create book
router.put('/:id', isAuthenticated, book.editBook);  //update / edit book
router.delete('/:id', isAuthenticated, book.deleteBook); //delete book
router.get('/:id', isAuthenticated, book.getBookById); //get book by id  --> user
router.post('/add-list', isAuthenticated, book.addBookToList); //add book to list  ---> user
// router.get('/book-category', book.getBookCategory); //get books based on category

export default router;
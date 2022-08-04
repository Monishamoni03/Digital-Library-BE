import { Router } from 'express';
import bookController from '../controllers/book-controller';

const router = Router();
const book = new bookController();

router.get('/', book.getAllBook); //all book
router.post('/book', book.addBook);  //create book
router.get('/view', book.viewBook); //fetch book
router.delete('/:bookId', book.deleteBook);  //delete book
router.put('/:bookId', book.updateBook);  //update book

export default router; 

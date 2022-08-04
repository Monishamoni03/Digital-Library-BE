import { Router } from 'express';
import bookController from '../controllers/book-controller';

const router = Router();
const book = new bookController();

router.get('/', book.getAllBook); //all book
router.post('/book', book.addBook);  //create book
router.get('/view/:id', book.viewBook); //fetch book
router.delete('/delete/:id', book.deleteBook);  //delete book
router.put('/update/:id', book.updateBook);  //update book

export default router; 
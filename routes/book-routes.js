import { Router } from 'express';
import bookController from '../controllers/book-controller';

const router = Router();
const book = new bookController();

router.get('/', book.getAllBook); //all book
router.post('/', book.addBook);  //create book
router.get('/view', book.viewBook); //fetch book
router.delete('/:id', book.deleteBook);  //delete book
router.put('/:id', book.updateBook);  //update book

export default router; 
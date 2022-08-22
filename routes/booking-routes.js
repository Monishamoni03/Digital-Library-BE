import { Router } from 'express';
import BookingController from '../controllers/bookings-controller';
import isAuthenticated from '../middleware/auth-middleware';

const router = Router();
const booking = new BookingController();

router.get('/', isAuthenticated, booking.viewAllBookings);     //all bookings
router.get('/:id', isAuthenticated, booking.viewUserBookings); //user booking
router.delete('/:id', isAuthenticated, booking.removeBook);    //user - remove books from book list

export default router;
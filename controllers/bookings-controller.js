import Booking from "../model/bookings"
import * as status from '../constants/status-code.js';

class BookingController {

    viewAllBookings = async (req, res) => {
        try {
            const allBookings = await Booking.find({}).populate( [{ path : 'book' }, { path : 'user' }])
            res.status(status.SUCCESS).send(allBookings)
        } catch( error ){
            res.status(status.NOT_FOUND).json({ message : 'No Bookings found'})
        }
    }
    
    viewUserBookings = async (req, res) => {
        try {
            const userBookings = await Booking.find({ user : req.params.id }).populate( { path : 'book'})
            res.status(status.SUCCESS).send(userBookings)
        } catch( error ){
            res.status(status.NOT_FOUND).json({ message : 'No Bookings found'})
        }
    }
}

export default BookingController;

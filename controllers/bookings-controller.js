import Booking from "../model/bookings"
import * as status from '../constants/status-code.js';

class BookingController {

    //admin-> all user booking list
    viewAllBookings = async (req, res) => {
        try {
            const allBookings = await Booking.find({}).populate( [{ path : 'book' }, { path : 'user' }])
            res.status(status.SUCCESS).send(allBookings)
        } catch( error ){
            res.status(status.NOT_FOUND).json({ message : 'No Available Bookings'})
        }
    }
    
    // user-> book list
    viewUserBookings = async (req, res) => {
        try {
            const userBookings = await Booking.find({ user : req.params.id }).populate( { path : 'book'})
            res.status(status.SUCCESS).send(userBookings)
        } catch( error ){
            res.status(status.NOT_FOUND).json({ message : 'No User Bookings found'})
        }
    }

    //user-> remove from booking list
    removeBook = async (req, res) => {
        try {
            await Booking.deleteOne({_id: req.params.id});
            res.status(status.SUCCESS).json("Successfully book has been removed from your list");
        } catch (error){
            res.status(status.NOT_FOUND).json({ message: error.message });     
        }
    }
}

export default BookingController;

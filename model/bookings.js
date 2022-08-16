import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({

    book : {
        type: Number,
        ref: 'Book'
    },
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
    
  }
  
);

export default mongoose.model('Booking', bookingSchema);
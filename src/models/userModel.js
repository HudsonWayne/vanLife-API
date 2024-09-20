import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  user_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  bookingHistoryIDs: [{ type: String, ref: 'Booking' }],
});

export default mongoose.model('User', userSchema);
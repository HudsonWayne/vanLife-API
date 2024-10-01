import express from "express";
 import {getAllBookings,getBookingById,createBooking,updateBooking,deleteBooking} from "../controllers/bookingController"

i

const router = express.Router();

router.get('/bookings', getAllBookings);
router.get('/bookings/:id', getBookingById);
router.post('/bookings', createBooking);
router.put('/bookings/:id', updateBooking);
router.delete('/bookings/:id', deleteBooking);


export default router;
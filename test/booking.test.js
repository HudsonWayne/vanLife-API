const express = require("express");
const router = express.Router();

let bookings = [];

router.post("/bookingRoutes", (req, res) => {
  const { carId, userId, startDate, endDate } = req.body;

  // Basic validation
  if (!carId || !userId || !startDate || !endDate) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const newBooking = {
    carId,
    userId,
    startDate,
    endDate,
    bookingId: bookings.length + 1,
  };
  bookings.push(newBooking);
  return res.status(201).json(newBooking);
});

module.exports = router;

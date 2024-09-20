// const express = require('express');
// const router = express.Router();


// router.get('/bookingsRoutes', (res, req)=>{
//     res.json({
//         message : "booking"
//     });
// })


// module.exports = router;


// src/routes/bookingRoutes.js
const express = require('express');
const router = express.Router();

// Define your routes here
router.get('/', (req, res) => {
    res.json({ message: "Booking Home" });
});

// Export the router
module.exports = router;
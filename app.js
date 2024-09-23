import bookingRoutes from './src/routes/bookingRoutes'
import paymentRoutes from './src/routes/paymentRoutes'
import reviewRoutes from './src/routes/reviewRoutes'
import userRoutes from './src/routes/userRoutes'
import  vanRoutes from './src/routes/vanRoutes'


app.use ("/api/user",userRoutes)
app.use ("/api/payment",paymentRoutes)
app.use ("/api/review",reviewRoutes)
app.use ("/api/van",vanRoutes)
app.use ("/api/booking",bookingRoutes)

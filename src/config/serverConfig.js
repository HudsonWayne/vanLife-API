import  userRoutes from "../routes/userRoutes"
import reviewRoutes from "../routes/reviewRoutes"
import bookingRoutes from "../routes/bookingRoutes"
import vanRoutes from "../routes/vaRoutes"
import paymentRoutes from "../routes/paymentRoutes"

app.use("/api/users",userRoutes)
app.use("/api/reviews",reviewRoutes)
app.use("/api/payment",paymentRoutes)
app.use("/api/van",vanRoutes)
app.use("/api/booking",bookingRoutes)

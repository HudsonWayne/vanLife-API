

import errorHandler from "../middlewares/errorMiddleware";

import userRoutes from "../routes/userRoutes";
import reviewRoutes from "../routes/reviewRoutes";
import bookingRoutes from "../routes/bookingRoutes";
import vanRoutes from "../routes/vaRoutes";
import paymentRoutes from "../routes/paymentRoutes";

app.use("/api/users", userRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/van", vanRoutes);
app.use("/api/booking", bookingRoutes);

//put this code after everyone code but not after when listening the port otherwise we will get a beautiful error message
app.use(errorHandler);


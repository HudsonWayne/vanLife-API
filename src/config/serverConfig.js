import errorHandler from "../middlewares/errorMiddleware";


//put this code after everyone code but not after when listening the port otherwise we will get a beautiful error message
app.use(errorHandler)
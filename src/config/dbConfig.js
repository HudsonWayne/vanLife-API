import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

const app = express();
// dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGOURL =
  process.env.MONGO_URI ||
  "mongodb+srv://vanLifeAPI:qwerty12345@vanlifecluster.t679a.mongodb.net/?retryWrites=true&w=majority&appName=VanLifeCluster";
mongoose
  .connect(MONGOURL)
  .then(() => {
    console.log(`Database is successfully configured`);
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => console.log(`error`));
console.log(MONGOURL)

import mongoose from "mongoose";


const hostSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  user_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  vansIds: [{ type: String, ref: "Van" }],
});

export default mongoose.model("Host", hostSchema);



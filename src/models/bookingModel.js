import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  hostId: { type: mongoose.Schema.Types.ObjectId, ref: "Host", required: true },
  vanId: { type: mongoose.Schema.Types.ObjectId, ref: "Van", required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  pendingApproval: { type: Boolean, default: true },
  isApproved: { type: Boolean, default: false },
});

export default mongoose.model("Booking", bookingSchema);

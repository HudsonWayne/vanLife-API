



import mongoose from "mongoose";

const vanSchema = new mongoose.Schema({
  van_id: { type: String, required: true },
  name: { type: String, required: true },
  pictureUrl: { type: String, required: true },
  category: { type: String, required: true },
  capacity: { type: String, required: true },
  pricePerDay: { type: Number, required: true },
  description: { type: String, required: true },
  available: { type: Boolean, default: true },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Host",
    required: true,
  },
});

export default mongoose.model("Van", vanSchema);
import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  review_id: { type: String, required: true },
  reviewed_van_id: { type: String, required: true, ref: 'Van' },
  review_date: { type: Date, default: Date.now },
  review_title: { type: String, required: true },
  review_stars: { type: Number, required: true, min: 1, max: 5 },
  review_text: {
    comfort: String,
    cleanliness: String,
    overall_experience: String,
    recommendation: { type: Boolean, required: true },
  },
  review_source: String,
});

export default mongoose.model('Review', reviewSchema);
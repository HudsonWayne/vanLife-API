import express from 'express';
const router = express.Router();

import {deleteReview,updateReview,getAllReviews,getReviewById,createReview} from "../../src/controllers/reviewController"

router.get("/reviews", getAllReviews);
router.get("/reviews/:id", getReviewById);
router.post("/reviews", createReview);
router.put("/reviews/:id", updateReview);
router.delete("/reviews/:id", deleteReview);
export default router;
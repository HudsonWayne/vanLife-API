const request = require("supertest");
const app = require("../src/routes/reviewRoutes"); // Your Express app

describe("Car Reviews System API Tests", () => {
  // Test to submit a new review
  test("POST /api/reviews should create a new review", async () => {
    const reviewData = {
      carId: "car123",
      userId: "user123",
      rating: 5,
      comment: "Great car, very clean and comfortable!",
    };

    const res = await request(app).post("/api/reviews").send(reviewData);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("message", "Review submitted successfully");
    expect(res.body.review).toHaveProperty("rating", 5);
  });

  // Test to fetch reviews for a specific car
  test("GET /api/reviews/car/:carId should return reviews for a specific car", async () => {
    const carId = "car123";

    const res = await request(app).get(`/api/reviews/car/${carId}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body[0]).toHaveProperty("carId", carId);
  });

  // Test to update a review
  test("PUT /api/reviews/:id should update a review", async () => {
    const updatedData = {
      rating: 4,
      comment: "Updated review: Still good, but could be better.",
    };

    const res = await request(app)
      .put("/api/reviews/1") // Assuming the review with ID 1 exists
      .send(updatedData);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message", "Review updated successfully");
    expect(res.body.review).toHaveProperty("rating", 4);
  });

  // Test to delete a review
  test("DELETE /api/reviews/:id should delete a review", async () => {
    const res = await request(app).delete("/api/reviews/1"); // Assuming the review with ID 1 exists

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message", "Review deleted successfully");
  });

  // Test for validation (e.g., invalid rating)
  test("POST /api/reviews should return error for invalid rating", async () => {
    const invalidReviewData = {
      carId: "car123",
      userId: "user123",
      rating: 6, // Invalid rating
      comment: "Great car!",
    };

    const res = await request(app).post("/api/reviews").send(invalidReviewData);

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("error", "Invalid review data");
  });
});

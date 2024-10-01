import request from "supertest";
import express from "express";
import reviewRouter from "../path/to/your/reviewRouter"; // Update with the correct path

const app = express();
app.use(express.json());
app.use(reviewRouter);

describe("Review Routes", () => {
  // Mock data for testing
  const mockReview = { content: "Great product!", rating: 5 };
  const mockReviews = [
    { id: 1, ...mockReview },
    { id: 2, ...mockReview },
  ];

  // Mocking the controller methods
  jest.mock("../controllers/reviewController", () => ({
    getAllReviews: jest.fn((req, res) => res.json(mockReviews)),
    getReviewById: jest.fn((req, res) => {
      const review = mockReviews.find((r) => r.id === parseInt(req.params.id));
      return review
        ? res.json(review)
        : res.status(404).send("Review not found");
    }),
    createReview: jest.fn((req, res) => {
      const newReview = { id: mockReviews.length + 1, ...req.body };
      mockReviews.push(newReview);
      return res.status(201).json(newReview);
    }),
    updateReview: jest.fn((req, res) => {
      const index = mockReviews.findIndex(
        (r) => r.id === parseInt(req.params.id)
      );
      if (index !== -1) {
        mockReviews[index] = { id: parseInt(req.params.id), ...req.body };
        return res.json(mockReviews[index]);
      }
      return res.status(404).send("Review not found");
    }),
    deleteReview: jest.fn((req, res) => {
      const index = mockReviews.findIndex(
        (r) => r.id === parseInt(req.params.id)
      );
      if (index !== -1) {
        mockReviews.splice(index, 1);
        return res.status(204).send();
      }
      return res.status(404).send("Review not found");
    }),
  }));

  it("GET /reviews - should return all reviews", async () => {
    const response = await request(app).get("/reviews");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(mockReviews);
  });

  it("GET /reviews/:id - should return a review by ID", async () => {
    const response = await request(app).get("/reviews/1");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(mockReviews[0]);
  });

  it("POST /reviews - should create a new review", async () => {
    const newReview = { content: "Excellent service!", rating: 5 };
    const response = await request(app).post("/reviews").send(newReview);

    expect(response.statusCode).toBe(201);
    expect(response.body.content).toBe(newReview.content);
  });

  it("PUT /reviews/:id - should update an existing review", async () => {
    const updatedData = { content: "Not bad!", rating: 4 };
    const response = await request(app).put("/reviews/1").send(updatedData);

    expect(response.statusCode).toBe(200);
    expect(response.body.content).toBe(updatedData.content);
  });

  it("DELETE /reviews/:id - should delete a review", async () => {
    const response = await request(app).delete("/reviews/1");
    expect(response.statusCode).toBe(204);

    const getResponse = await request(app).get("/reviews/1");
    expect(getResponse.statusCode).toBe(404); // Ensure it's deleted
  });
});

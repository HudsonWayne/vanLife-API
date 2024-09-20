const request = require("supertest");
const express = require("express");
const bookingRouter = require("../routes/bookingRoutes.js"); // Adjust the path as necessary

const app = express();
app.use(express.json());
app.use("/api", bookingRouter);

describe("Booking API", () => {
  it("should create a new booking", async () => {
    const res = await request(app).post("/api/book").send({
      carId: "123",
      userId: "456",
      startDate: "2024-09-21",
      endDate: "2024-09-25",
    });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("bookingId");
    expect(res.body.carId).toBe("123");
  });

  it("should return 400 if fields are missing", async () => {
    const res = await request(app).post("/api/book").send({
      carId: "123", // Missing userId, startDate, and endDate
    });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("All fields are required");
  });
});


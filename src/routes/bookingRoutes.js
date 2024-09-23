import request from "supertest";
import express from "express";
import bookingRoutes from "../src/routes/bookingRoutes"; // Adjust the path as needed

const app = express();
app.use(express.json()); // For parsing application/json
app.use(bookingRoutes); // Use the booking routes

describe("Booking API", () => {
  
  // Mock booking data
  const mockBooking = { carId: "car123", userId: "user123", startDate: "2023-10-01", endDate: "2023-10-05" };

  it("should create a booking", async () => {
    const res = await request(app)
      .post("/bookings")
      .send(mockBooking);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("message", "Booking created successfully"); // Adjust based on your response
  });

  it("should get all bookings", async () => {
    const res = await request(app).get("/bookings");

    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Array); // Assuming bookings are returned as an array
  });

  it("should get a booking by ID", async () => {
    const bookingId = "1"; // Use an actual booking ID
    const res = await request(app).get(`/bookings/${bookingId}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("id", bookingId); // Adjust based on your response
  });

  it("should update a booking", async () => {
    const bookingId = "1"; // Use an actual booking ID
    const updatedBooking = { ...mockBooking, endDate: "2023-10-10" }; // Change the end date

    const res = await request(app)
      .put(`/bookings/${bookingId}`)
      .send(updatedBooking);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message", "Booking updated successfully"); // Adjust based on your response
  });

  it("should delete a booking", async () => {
    const bookingId = "1"; // Use an actual booking ID
    const res = await request(app).delete(`/bookings/${bookingId}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message", "Booking deleted successfully"); // Adjust based on your response
  });
});

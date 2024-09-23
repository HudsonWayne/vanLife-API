import request from 'supertest';
import express from 'express';
import mongoose from 'mongoose';
import bookingRoutes from '../src/routes/bookingRoutes.js'; // Adjust the path if necessary

const app = express();
app.use(express.json());
app.use(bookingRoutes);

// Connect to a test database
beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27017/test_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

// Clean up the database after each test
afterEach(async () => {
  await mongoose.connection.db.dropDatabase();
});

// Close the database connection after all tests
afterAll(async () => {
  await mongoose.connection.close();
});

describe("updateBooking function", () => {
  it("should return 404 when updating a non-existent booking", async () => {
    const nonExistentId = "vincent"; // Non-existent booking ID
    const response = await request(app)
      .put(`/bookings/${nonExistentId}`)
      .send({ title: "Updated Booking" });

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: "Booking not found" });
  });
});

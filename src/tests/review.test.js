// Import required libraries and modules
const request = require("supertest");
const server = require("../src/routes/reviewRoutes"); // Import the server

// Unit test for bookingRoutes.js - export default router
describe("Booking Routes", () => {
  describe("GET /bookings", () => {
    it("should handle multiple concurrent requests to the same endpoint", async () => {
      // Simulate multiple concurrent requests
      const requests = [
        request(server).get("/bookings"),
        request(server).get("/bookings"),
        request(server).get("/bookings"),
      ];

      const responses = await Promise.all(requests);

      responses.forEach((response) => {
        expect(response.status).toBe(200);
      });
    });
  });
});

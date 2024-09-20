const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server"); // Your Express app
const should = chai.should();

chai.use(chaiHttp);

describe("Car Booking System API Tests", () => {
  // Test to view all available cars
  describe("/GET available cars", () => {
    it("it should GET all the available cars for booking", (done) => {
      chai
        .request(server)
        .get("/api/bookings/cars/available")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body.length.should.be.above(0);
          done();
        });
    });
  });

  // Test for booking a car
  describe("/POST book a car", () => {
    it("it should POST a new booking record for a car", (done) => {
      const bookingDetails = {
        carId: "car456",
        userId: "user456",
        bookingDate: "2024-09-25",
        returnDate: "2024-09-30",
      };
      chai
        .request(server)
        .post("/api/bookings")
        .send(bookingDetails)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a("object");
          res.body.should.have
            .property("message")
            .eql("Car booked successfully");
          res.body.should.have.property("bookingId");
          done();
        });
    });
  });

  // Test for viewing booking details
  describe("/GET booking details", () => {
    it("it should GET the details of an existing booking", (done) => {
      const bookingId = "booking123"; // Use a valid booking ID from your system
      chai
        .request(server)
        .get(`/api/bookings/${bookingId}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("carId");
          res.body.should.have.property("userId");
          res.body.should.have.property("bookingDate");
          res.body.should.have.property("returnDate");
          done();
        });
    });
  });

  // Test for cancelling a booking
  describe("/DELETE cancel a booking", () => {
    it("it should DELETE a booking by booking ID", (done) => {
      const bookingId = "booking123"; // Use a valid booking ID from your system
      chai
        .request(server)
        .delete(`/api/bookings/${bookingId}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have
            .property("message")
            .eql("Booking cancelled successfully");
          done();
        });
    });
  });
});

import request from "supertest";
import express from "express";
import paymentRouter from "../routes/paymentRoutes.js";

const app = express();
app.use(express.json());
app.use(paymentRouter);

describe("Payment Routes", () => {
  // Mock data for testing
  const mockPayment = { amount: 100, method: "credit card" };
  const mockPayments = [
    { id: 1, ...mockPayment },
    { id: 2, ...mockPayment },
  ];

  // Mocking the controller methods
  jest.mock("../controllers/paymentController", () => ({
    getAllPayments: jest.fn((req, res) => res.json(mockPayments)),
    getPaymentById: jest.fn((req, res) => {
      const payment = mockPayments.find(
        (p) => p.id === parseInt(req.params.id)
      );
      return payment
        ? res.json(payment)
        : res.status(404).send("Payment not found");
    }),
    createPayment: jest.fn((req, res) => {
      const newPayment = { id: mockPayments.length + 1, ...req.body };
      mockPayments.push(newPayment);
      return res.status(201).json(newPayment);
    }),
    updatePayment: jest.fn((req, res) => {
      const index = mockPayments.findIndex(
        (p) => p.id === parseInt(req.params.id)
      );
      if (index !== -1) {
        mockPayments[index] = { id: parseInt(req.params.id), ...req.body };
        return res.json(mockPayments[index]);
      }
      return res.status(404).send("Payment not found");
    }),
    deletePayment: jest.fn((req, res) => {
      const index = mockPayments.findIndex(
        (p) => p.id === parseInt(req.params.id)
      );
      if (index !== -1) {
        mockPayments.splice(index, 1);
        return res.status(204).send();
      }
      return res.status(404).send("Payment not found");
    }),
  }));

  it("GET /payments - should return all payments", async () => {
    const response = await request(app).get("/payments");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(mockPayments);
  });

  it("GET /payments/:id - should return a payment by ID", async () => {
    const response = await request(app).get("/payments/1");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(mockPayments[0]);
  });

  it("POST /payments - should create a new payment", async () => {
    const newPayment = { amount: 200, method: "debit card" };
    const response = await request(app).post("/payments").send(newPayment);

    expect(response.statusCode).toBe(201);
    expect(response.body.amount).toBe(newPayment.amount);
  });

  it("PUT /payments/:id - should update an existing payment", async () => {
    const updatedData = { amount: 150 };
    const response = await request(app).put("/payments/1").send(updatedData);

    expect(response.statusCode).toBe(200);
    expect(response.body.amount).toBe(updatedData.amount);
  });

  it("DELETE /payments/:id - should delete a payment", async () => {
    const response = await request(app).delete("/payments/1");
    expect(response.statusCode).toBe(204);

    const getResponse = await request(app).get("/payments/1");
    expect(getResponse.statusCode).toBe(404); // Ensure it's deleted
  });
});

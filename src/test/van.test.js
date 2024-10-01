import request from "supertest";
import express from "express";
import vanRouter from "../path/to/your/vanRouter"; // Update with the correct path

const app = express();
app.use(express.json());
app.use(vanRouter);

describe("Van Routes", () => {
  // Mock data for testing
  const mockVan = { make: "Ford", model: "Transit", year: 2020 };
  const mockVans = [
    { id: 1, ...mockVan },
    { id: 2, ...mockVan },
  ];

  // Mocking the controller methods
  jest.mock("../controllers/vanController", () => ({
    getAllVans: jest.fn((req, res) => res.json(mockVans)),
    getVanById: jest.fn((req, res) => {
      const van = mockVans.find((v) => v.id === parseInt(req.params.id));
      return van ? res.json(van) : res.status(404).send("Van not found");
    }),
    createVan: jest.fn((req, res) => {
      const newVan = { id: mockVans.length + 1, ...req.body };
      mockVans.push(newVan);
      return res.status(201).json(newVan);
    }),
    updateVan: jest.fn((req, res) => {
      const index = mockVans.findIndex((v) => v.id === parseInt(req.params.id));
      if (index !== -1) {
        mockVans[index] = { id: parseInt(req.params.id), ...req.body };
        return res.json(mockVans[index]);
      }
      return res.status(404).send("Van not found");
    }),
    deleteVan: jest.fn((req, res) => {
      const index = mockVans.findIndex((v) => v.id === parseInt(req.params.id));
      if (index !== -1) {
        mockVans.splice(index, 1);
        return res.status(204).send();
      }
      return res.status(404).send("Van not found");
    }),
  }));

  it("GET /vans - should return all vans", async () => {
    const response = await request(app).get("/vans");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(mockVans);
  });

  it("GET /vans/:id - should return a van by ID", async () => {
    const response = await request(app).get("/vans/1");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(mockVans[0]);
  });

  it("POST /vans - should create a new van", async () => {
    const newVan = { make: "Mercedes", model: "Sprinter", year: 2021 };
    const response = await request(app).post("/vans").send(newVan);

    expect(response.statusCode).toBe(201);
    expect(response.body.make).toBe(newVan.make);
  });

  it("PUT /vans/:id - should update an existing van", async () => {
    const updatedData = { model: "Transit Custom" };
    const response = await request(app).put("/vans/1").send(updatedData);

    expect(response.statusCode).toBe(200);
    expect(response.body.model).toBe(updatedData.model);
  });

  it("DELETE /vans/:id - should delete a van", async () => {
    const response = await request(app).delete("/vans/1");
    expect(response.statusCode).toBe(204);

    const getResponse = await request(app).get("/vans/1");
    expect(getResponse.statusCode).toBe(404); // Ensure it's deleted
  });
});

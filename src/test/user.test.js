import request from "supertest";
import express from "express";
import userRouter from "../path/to/your/userRouter"; // Update with the correct path

const app = express();
app.use(express.json());
app.use(userRouter);

describe("User Routes", () => {
  // Mock data for testing
  const mockUser = { name: "John Doe", email: "john@example.com" };
  const mockUsers = [
    { id: 1, ...mockUser },
    { id: 2, ...mockUser },
  ];

  // Mocking the controller methods
  jest.mock("../controllers/userController", () => ({
    getAllUsers: jest.fn((req, res) => res.json(mockUsers)),
    getUserById: jest.fn((req, res) => {
      const user = mockUsers.find((u) => u.id === parseInt(req.params.id));
      return user ? res.json(user) : res.status(404).send("User not found");
    }),
    createUser: jest.fn((req, res) => {
      const newUser = { id: mockUsers.length + 1, ...req.body };
      mockUsers.push(newUser);
      return res.status(201).json(newUser);
    }),
    updateUser: jest.fn((req, res) => {
      const index = mockUsers.findIndex(
        (u) => u.id === parseInt(req.params.id)
      );
      if (index !== -1) {
        mockUsers[index] = { id: parseInt(req.params.id), ...req.body };
        return res.json(mockUsers[index]);
      }
      return res.status(404).send("User not found");
    }),
    deleteUser: jest.fn((req, res) => {
      const index = mockUsers.findIndex(
        (u) => u.id === parseInt(req.params.id)
      );
      if (index !== -1) {
        mockUsers.splice(index, 1);
        return res.status(204).send();
      }
      return res.status(404).send("User not found");
    }),
  }));

  it("GET /users - should return all users", async () => {
    const response = await request(app).get("/users");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(mockUsers);
  });

  it("GET /users/:id - should return a user by ID", async () => {
    const response = await request(app).get("/users/1");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(mockUsers[0]);
  });

  it("POST /users - should create a new user", async () => {
    const newUser = { name: "Jane Doe", email: "jane@example.com" };
    const response = await request(app).post("/users").send(newUser);

    expect(response.statusCode).toBe(201);
    expect(response.body.name).toBe(newUser.name);
  });

  it("PUT /users/:id - should update an existing user", async () => {
    const updatedData = { name: "John Smith" };
    const response = await request(app).put("/users/1").send(updatedData);

    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe(updatedData.name);
  });

  it("DELETE /users/:id - should delete a user", async () => {
    const response = await request(app).delete("/users/1");
    expect(response.statusCode).toBe(204);

    const getResponse = await request(app).get("/users/1");
    expect(getResponse.statusCode).toBe(404); // Ensure it's deleted
  });
});

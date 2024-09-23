import express from "express";
 import { deleteUser,updateUser,createUser,getAllUsers,getAllUsers } from "../../src/controllers/userController";


const router = express.Router();


router.get("/users", getAllUsers);
router.get("/users/:id", getUserById);
router.post("/users", createUser);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);



export default router

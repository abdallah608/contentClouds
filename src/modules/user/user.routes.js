import express from "express";
import { validation } from "../../utilities/validation/validation.js";
import {
  createUser,
  deleteUser,
  getAllUser,
  getUserById,
  updateUser,
} from "./controllers/user.controller.js";
import { createUserSchema, updateUserSchema } from "./user.validation.js";

const router = express.Router();

// Create a new user
router.post("/", validation(createUserSchema), createUser);
// Get all users
router.get("/", getAllUser);
// Get user by ID
router.get("/:id", getUserById);
// update user 
router.put("/:id", validation(updateUserSchema),updateUser);
// delete user 
router.delete("/:id", deleteUser);
export default router;

import express from "express";
import { userMock } from "../mocks/userMock.js";
import { signupUser, loginUser, getUserById, getUsersAll } from "../controllers/user.controllers.js";

const router = express.Router()

// GET user
router.get("/", getUsersAll)

// GET user by id
router.get("/:id", getUserById)

// POST signup
router.post("/signup", signupUser)

// POST login
router.post("/login", loginUser)

export default router;
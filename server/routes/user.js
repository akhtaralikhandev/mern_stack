import { GoogleUser, Login, signUp } from "../controllers/user.js";
import express from "express";

const router = express.Router();

router.post("/signup", signUp);
router.post("/googleUser", GoogleUser);
router.post("/login", Login);
export default router;

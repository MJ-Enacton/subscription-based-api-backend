import { Router } from "express";
import {
  handleLogin,
  handleRegister,
  handleLogout,
} from "../controllers/auth.controller.js";

const router = Router();

router.post("/register", handleRegister);
router.post("/login", handleLogin);
router.post("/logout", handleLogout)

export default router;

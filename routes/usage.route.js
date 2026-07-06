import { Router } from "express";
import {
  handleGetUsage,
  handleGetData,
} from "../controllers/usage.controller.js";
import isAuth from "../middleware/isAuth.js";
import hasLimit from "../middleware/hasLimit.js";

const router = Router();

router.get("/usage", isAuth, handleGetUsage);
router.get("/data", isAuth,hasLimit, handleGetData);

export default router;

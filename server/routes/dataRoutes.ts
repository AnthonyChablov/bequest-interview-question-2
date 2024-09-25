import { Router } from "express";
import {
  getDataHandler,
  updateDataHandler,
  verifyDataHandler,
} from "../controllers/dataControllers";

const router = Router();

// Define routes
router.get("/", getDataHandler); // GET /api/data
router.post("/", updateDataHandler); // POST /api/data
router.post("/verify", verifyDataHandler); // POST /api/data/verify

export default router;

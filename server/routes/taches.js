import { Router } from "express";
import tacheController from "../controllers/tacheController.js";

const router = Router();

router.get("/", tacheController.getAll);
router.post("/", tacheController.create);

export default router;

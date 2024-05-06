import express from "express";
import auth from "../middleware/auth.js";

import {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService,
} from "../controllers/services.js";

const router = express.Router();

router.post("/create", createService);
router.get("/all", getAllServices);
router.get("/getbyid/:id", getServiceById);
router.patch("/updatebyid/:id", updateService);
router.delete("/deletebyid/:id", deleteService);

export default router;


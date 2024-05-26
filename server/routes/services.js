import express from "express";
import { adminAuth } from "../middleware/auth.js";

import {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService,
  getServiceByUrlKey
} from "../controllers/services.js";

const router = express.Router();

router.post("/create", adminAuth, createService);
router.get("/all", getAllServices);
router.get("/getbyid/:id", getServiceById);
router.get("/:urlKey", getServiceByUrlKey);
router.patch("/updatebyid/:id", adminAuth, updateService);
router.delete("/deletebyid/:id", adminAuth, deleteService);

export default router;


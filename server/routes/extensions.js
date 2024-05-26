import express from "express";
import { adminAuth } from "../middleware/auth.js";

import {
  getAllExtensions,
  createExtension,
  getExtensionById,
  updateExtension,
  deleteExtension,
  getExtensionByUrlKey
} from "../controllers/extensions.js";

const router = express.Router();

router.get("/all", getAllExtensions);
router.get("/getbyid/:id", getExtensionById);
router.get("/:urlKey", getExtensionByUrlKey);

router.post("/create", adminAuth, createExtension);
router.patch("/:id", adminAuth, updateExtension);
router.delete("/deletebyid/:id", adminAuth, deleteExtension);

export default router;

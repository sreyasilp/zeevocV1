import express from "express";
import auth from "../middleware/auth.js";

import {
  getAllExtensions,
  createExtension,
  getExtensionById,
  updateExtension,
  deleteExtension,
} from "../controllers/extensions.js";

const router = express.Router();

router.get("/all", getAllExtensions);
router.get("/:id", getExtensionById);

router.post("/create", createExtension);
router.patch("/:id",  updateExtension);
router.delete("/deletebyid/:id", deleteExtension);

export default router;

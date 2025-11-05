import express from "express";
import {
  getAllDoctors,
  createDoctor,
  updateDoctor,
  deleteDoctor,
} from "../../controllers/doctorController.js";
import { createDoctorValidation, validateRequest } from "../../middlewares/validations/doctor.validation.js";

const router = express.Router();

router.get("/", getAllDoctors);
router.post("/", createDoctorValidation, validateRequest,createDoctor);
router.put("/:id", updateDoctor);
router.delete("/:id", deleteDoctor);

export default router;

import express from "express";
import {
  getAllDoctors,
  createDoctor,
  updateDoctor,
  deleteDoctor,
} from "../../controllers/doctorController.js";
import { createDoctorValidation, updateDoctorValidation, validateRequest } from "../../middlewares/validations/doctor.validation.js";

const router = express.Router();

router.get("/", getAllDoctors);
router.post("/", createDoctorValidation, validateRequest,createDoctor);
router.put("/:id",updateDoctorValidation, validateRequest, updateDoctor);
router.delete("/:id", deleteDoctor);

export default router;

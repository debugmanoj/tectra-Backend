// middlewares/validations/doctor.validation.js
import { body, validationResult } from "express-validator";

/**
 * @desc Validation rules for creating a doctor
 */
export const createDoctorValidation = [
  body("name").notEmpty().withMessage("Name is required"),
  body("specialty").notEmpty().withMessage("Specialty is required"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format"),
  body("contact")
    .notEmpty()
    .withMessage("Contact is required")
    .matches(/^\d{10}$/)
    .withMessage("Contact must be a 10-digit number"),
  body("dob").optional().isISO8601().withMessage("DOB must be a valid date"),
  body("status")
    .optional()
    .isIn(["Active", "Inactive"])
    .withMessage("Status must be either 'Active' or 'Inactive'"),
];

/**
 * @desc Validation rules for updating a doctor
 */
export const updateDoctorValidation = [
  body("name").optional().notEmpty().withMessage("Name cannot be empty"),
  body("specialty").optional().notEmpty().withMessage("Specialty cannot be empty"),
  body("email").optional().isEmail().withMessage("Invalid email format"),
  body("contact")
    .optional()
    .matches(/^\d{10}$/)
    .withMessage("Contact must be a 10-digit number"),
  body("dob").optional().isISO8601().withMessage("DOB must be a valid date"),
  body("status")
    .optional()
    .isIn(["Active", "Inactive"])
    .withMessage("Status must be either 'Active' or 'Inactive'"),
];

/**
 * @desc Common validation handler
 */
export const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors.array().map((e) => e.msg),
    });
  }
  next();
};

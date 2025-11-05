import * as doctorService from "../services/doctorService.js";

export const getAllDoctors = async (req, res, next) => {
  try {
    const result = await doctorService.getDoctors(req.query);
    res.json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};

export const createDoctor = async (req, res, next) => {
  try {
    const doctor = await doctorService.createDoctor(req.body);
    res.status(201).json({ success: true, data: doctor });
  } catch (err) {
    next(err);
  }
};

export const updateDoctor = async (req, res, next) => {
  try {
    const doctor = await doctorService.updateDoctor(req.params.id, req.body);
    res.json({ success: true, data: doctor });
  } catch (err) {
    next(err);
  }
};

export const deleteDoctor = async (req, res, next) => {
  try {
    await doctorService.deleteDoctor(req.params.id);
    res.json({ success: true, message: "Doctor deleted successfully" });
  } catch (err) {
    next(err);
  }
};

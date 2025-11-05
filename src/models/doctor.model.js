import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    specialty: { type: String, required: true, index: true },
    dob: { type: Date },
    email: { type: String, required: true, unique: true, lowercase: true, index: true },
    contact: { type: String },
    status: { type: String, enum: ["Active", "Inactive"], default: "Active", index: true },
  },
  { timestamps: true }
);

doctorSchema.index({ name: "text", specialty: "text", email: "text" });
doctorSchema.index({ specialty: 1, status: 1, createdAt: -1 });

export default mongoose.models.Doctor || mongoose.model("Doctor", doctorSchema);

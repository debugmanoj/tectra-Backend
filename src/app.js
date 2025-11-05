import express from "express";
import dotenv from 'dotenv'
import cors from "cors";
import helmet from "helmet";
import doctorRoutes from "./routes/v1/doctor.routes.js";
import { connectDB } from "./config/db.js";
import errorHandler from "./middlewares/errorHandler.js";
dotenv.config();

const app = express();

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());

// Connect DB (ensure single connection in serverless)
connectDB();

// Routes (v1)
app.use("/api/v1/doctors", doctorRoutes);

// Error handler
app.use(errorHandler);

export default app;
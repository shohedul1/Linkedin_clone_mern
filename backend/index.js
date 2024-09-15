import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./db/db.js";
import authRoutes from "./routes/auth.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5174';  // Fallback if .env is not set

app.use(cors({
    origin: CLIENT_URL,
    credentials: true,  // Allows credentials like cookies and headers to be sent
    methods: "GET,POST,PUT,DELETE,OPTIONS",  // Allow these methods
    allowedHeaders: "Content-Type, Authorization",  // Allow necessary headers
}));

app.use(express.json({ limit: "5mb" }));
app.use(cookieParser());

app.use("/api/v1/auth", authRoutes);

// Preflight request handler
app.options('*', cors());  // This ensures the server responds to preflight requests

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    connectDB();
});

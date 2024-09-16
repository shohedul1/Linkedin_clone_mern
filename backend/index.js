import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./db/db.js";
import authRoutes from "./routes/auth.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL;  // Fallback if .env is not set

app.use(cors({
    origin: true,
    credentials: true
}))


app.use(express.json({ limit: "5mb" }));
app.use(cookieParser());

app.use("/api/v1/auth", authRoutes);

// Preflight request handler
app.options('*', cors());  // This ensures the server responds to preflight requests

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    connectDB();
});

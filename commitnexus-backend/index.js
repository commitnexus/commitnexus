import connectDB from "./db";
import folderRoutes from "./routes/folderRoutes";
import express from "express";
import { createServer } from "@vercel/node"; // ✅ Required for Vercel deployment

const app = express();
app.use(express.json());

// ✅ Connect to MongoDB
connectDB();

// ✅ Add Routes
app.use("/api/folders", folderRoutes);

// ✅ Default Route
app.get("/", (req, res) => {
  res.status(200).json({ message: "🚀 Love you Nashmitha💕💕💕💕💕💕💕💕 Deepak" });
});

// ✅ Export as a Vercel-compliant function
export default createServer(app);

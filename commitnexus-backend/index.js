import connectDB from "./db";
import folderRoutes from "./routes/folderRoutes";
import { createRouter } from "next-connect";

export default async function handler(req, res) {
  await connectDB(); // Ensure MongoDB is connected

  const router = createRouter();

  // ✅ Add Routes
  router.use("/api/folders", folderRoutes);

  // ✅ Default Route
  router.get("/", (req, res) => {
    res.status(200).json({
      message: "love you nashmitha💕💕💕💕💕",
    });
  });

  return router.run(req, res);
}

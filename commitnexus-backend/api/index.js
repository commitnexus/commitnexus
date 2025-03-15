import connectDB from "./db";

export default async function handler(req, res) {
  await connectDB(); // Ensure MongoDB is connected

  res.status(200).json({
    message: "love you nashmitha💕💕💕💕💕",
  });
}

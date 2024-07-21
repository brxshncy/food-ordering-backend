// Initialize express, mongoose, cors, dotenv
import express, { Request, Response } from "express";
import "dotenv/config";
import cors from "cors";
import { connectDb } from "./config/db.config";
import myUserRoute from "./routes/userRoutes";
import { v2 as cloudinary } from "cloudinary";
import restaurantRoutes from "./routes/restaurantRoutes";

const app = express();
const PORT = 5001 || process.env.PORT;
// Middleware that converts the body from the request sent to server to JSON
app.use(express.json());
app.use(cors());

// Connect DB
connectDb();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.get("/health", async (req: Request, res: Response) => {
  res.send({
    message: "Health Ok!",
  });
});

// Declare Routes and create routes folder
app.use("/api/my/user", myUserRoute);
app.use("/api/my/restaurant", restaurantRoutes);
app.listen(PORT, () => {
  console.log(`Server is running at PORT: ${PORT}`);
});

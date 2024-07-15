// Initialize express, mongoose, cors, dotenv
import express, { Request, Response } from "express";
import "dotenv/config";
import cors from "cors";
import { connectDb } from "./config/db.config";
import myUserRoute from "./routes/userRoutes";
import { jwtCheck } from "./middleware/auth";

const app = express();
const PORT = 5001 || process.env.PORT;
// Middleware that converts the body from the request sent to server to JSON
app.use(express.json());
app.use(cors());

// Connect DB
connectDb();

app.get("/health", async (req: Request, res: Response) => {
  res.send({
    message: "Health Ok!",
  });
});

// Declare Routes and create routes folder
app.use("/api/my/user", myUserRoute);

app.listen(PORT, () => {
  console.log(`Server is running at PORT: ${PORT}`);
});

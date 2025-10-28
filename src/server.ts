import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { userRouter } from "./routes/user.routes";

dotenv.config()

const app = express();
const port = process.env.port || 3000;
app.use(express.json());
app.use(cors());

app.use("/user", userRouter);

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});

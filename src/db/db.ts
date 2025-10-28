import mongoose from "mongoose";
import dotnev from "dotenv";

dotnev.config();

let user = process.env.DB_USER;
let pass = process.env.DB_PW;

mongoose.connect(
  `mongodb+srv://${user}:${pass}@cluster0.g6wpo.mongodb.net/project_one`
);

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

export const Users = mongoose.model("Users", userSchema);

module.exports = {
  Users,
};

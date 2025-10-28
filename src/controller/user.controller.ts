import { type Request, type Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Users } from "../db/db";

dotenv.config();
const jwtPass = process.env.JWT_PASS;

export async function userSignup(req: Request, res: Response) {
  try {
    let { username, email, password } = req.body;
    if (!username || !email || !password) {
      res.status(400).json({
        message: "Bad Request, Input fields cannot be left empty",
      });
      return;
    }

    let existingUser = await Users.findOne({
      email,
    });

    if (existingUser) {
      res.status(409).json({
        message: "A user with this email already exists in our db",
      });
      return;
    }

    let hashedPassword = await bcrypt.hash(password, 10);

    let newUser = await Users.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(200).json({
      message: "User created successfully",
      newUser
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
}

export async function userLogin(req: Request, res: Response) {
  try {
    let { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({
        message: "Bad Request, Input fields cannot be left empty",
      });
      return;
    }

    let existingUser = await Users.findOne({
      email,
    });

    if (!existingUser) {
      res.status(404).json({
        message: "No such user found in our db",
      });
      return;
    }

    let passwordMatch = await bcrypt.compare(
      password,
      existingUser.password as string
    );

    if (!passwordMatch) {
      res.status(401).json({
        message: "Password didn't matched",
      });
      return;
    }

    let token = jwt.sign({ email }, jwtPass!);

    res.status(200).json({
      message: "Logged in successfully",
      token
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
}

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSignup = userSignup;
exports.userLogin = userLogin;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("../db/db");
dotenv_1.default.config();
const jwtPass = process.env.JWT_PASS;
async function userSignup(req, res) {
    try {
        let { username, email, password } = req.body;
        if (!username || !email || !password) {
            res.status(400).json({
                message: "Bad Request, Input fields cannot be left empty",
            });
            return;
        }
        let existingUser = await db_1.Users.findOne({
            email,
        });
        if (existingUser) {
            res.status(409).json({
                message: "A user with this email already exists in our db",
            });
            return;
        }
        let hashedPassword = await bcrypt_1.default.hash(password, 10);
        let newUser = await db_1.Users.create({
            username,
            email,
            password: hashedPassword,
        });
        res.status(200).json({
            message: "User created successfully",
            newUser
        });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: error.message,
            });
        }
    }
}
async function userLogin(req, res) {
    try {
        let { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({
                message: "Bad Request, Input fields cannot be left empty",
            });
            return;
        }
        let existingUser = await db_1.Users.findOne({
            email,
        });
        if (!existingUser) {
            res.status(404).json({
                message: "No such user found in our db",
            });
            return;
        }
        let passwordMatch = await bcrypt_1.default.compare(password, existingUser.password);
        if (!passwordMatch) {
            res.status(401).json({
                message: "Password didn't matched",
            });
            return;
        }
        let token = jsonwebtoken_1.default.sign({ email }, jwtPass);
        res.status(200).json({
            message: "Logged in successfully",
            token
        });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: error.message,
            });
        }
    }
}
//# sourceMappingURL=user.controller.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
let user = process.env.DB_USER;
let pass = process.env.DB_PW;
mongoose_1.default.connect(`mongodb+srv://${user}:${pass}@cluster0.g6wpo.mongodb.net/project_one`);
const userSchema = new mongoose_1.default.Schema({
    username: String,
    email: String,
    password: String,
});
exports.Users = mongoose_1.default.model("Users", userSchema);
module.exports = {
    Users: exports.Users,
};
//# sourceMappingURL=db.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const user_controller_1 = require("../controller/user.controller");
const userRouter = (0, express_1.Router)();
exports.userRouter = userRouter;
userRouter.post("/signup", user_controller_1.userSignup);
userRouter.post("/login", user_controller_1.userLogin);
//# sourceMappingURL=user.routes.js.map
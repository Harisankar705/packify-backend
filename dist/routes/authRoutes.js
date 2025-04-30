"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authService_1 = require("../services/authService");
const authController_1 = require("../controller/authController");
const userRepository_1 = require("../repository/userRepository");
const authRouter = express_1.default.Router();
const userRepository = new userRepository_1.UserRepository();
const authService = new authService_1.AuthService(userRepository);
const authController = new authController_1.AuthController(authService);
authRouter.post('/register', authController.register.bind(authController));
authRouter.post('/login', authController.login.bind(authController));
authRouter.post('/adminlogin', authController.adminLogin.bind(authController));
authRouter.post('/google', authController.googleLogin.bind(authController));
exports.default = authRouter;

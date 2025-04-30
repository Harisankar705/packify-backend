"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const protect_1 = __importDefault(require("../middleware/protect"));
const userController_1 = require("../controller/userController");
const userService_1 = require("../services/userService");
const userRepository_1 = require("../repository/userRepository");
const userRepository = new userRepository_1.UserRepository();
const userService = new userService_1.UserService(userRepository);
const userController = new userController_1.UserController(userService);
const userRoutes = express_1.default.Router();
userRoutes.get('/me', (0, protect_1.default)(['user', 'admin']), userController.getProfile.bind(userController));
userRoutes.put('/me', (0, protect_1.default)(['user']), userController.updateProfile.bind(userController));
userRoutes.get('/getallusers', (0, protect_1.default)(['admin']), userController.getAllUser.bind(userController));
exports.default = userRoutes;

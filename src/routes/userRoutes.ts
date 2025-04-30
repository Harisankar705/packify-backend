import express from 'express';
import protect from '../middleware/protect';
import { UserController } from '../controller/userController';
import { UserService } from '../services/userService'; 
import { UserRepository } from '../repository/userRepository';
const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);
const userRoutes = express.Router();

userRoutes.get('/me', protect(['user', 'admin']), userController.getProfile.bind(userController));
userRoutes.put('/me', protect(['user']), userController.updateProfile.bind(userController));
userRoutes.get('/getallusers', protect(['admin']), userController.getAllUser.bind(userController));
export default userRoutes;

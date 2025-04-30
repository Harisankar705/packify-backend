import express, { Router } from 'express';
import { AuthService } from '../services/authService';
import { AuthController } from '../controller/authController';
import { UserRepository } from '../repository/userRepository';

const authRouter: Router = express.Router();
const userRepository = new UserRepository();
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);

authRouter.post('/register', authController.register.bind(authController));
authRouter.post('/login', authController.login.bind(authController));
authRouter.post('/adminlogin', authController.adminLogin.bind(authController));

export default authRouter;

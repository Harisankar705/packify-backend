import  bcrypt  from 'bcryptjs';
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { IAuthController, IAuthService } from "../interfaces/interfaces";
import { OAuth2Client } from "google-auth-library";
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export class AuthController implements IAuthController {
  private authService: IAuthService;
  constructor(authService: IAuthService) {
    this.authService = authService;
  }
  async register(req: Request, res: Response): Promise<void> {
    try {
      const user = await this.authService.register(req.body);
      res.status(201).json(user);
      console.log("registered");
    } catch (err: any) {
      console.error("Registration error ", err);
      res.status(400).json({ message: err.message || "Registration failed" });
    }
  }
  async googleLogin(req: Request, res: Response) {
    try {
      const { token } = req.body;

      
      if (!token) {
        return res
          .status(400)
          .json({ success: false, message: "Token is required!" });
      }

      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.AUTH_GOOGLE_ID, 
      });

      const payload = ticket.getPayload();

      if (!payload) {
        return res
          .status(401)
          .json({ success: false, message: "Invalid Google token!" });
      }

      const { user, accessToken } =
        await this.authService.authenticateGoogleUser(token);

      res.json({ success: true, user, token: accessToken });
    } catch (error) {
      console.error("Google login error:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  }

  async adminLogin(req: Request, res: Response): Promise<void> {
    try {
      console.log(req.body)
      const {email, password } = req.body
      console.log("IN ADMINLOGIN")
      console.log
      if(!email||!password)
      {
        res.status(404).json({message:"Invalid email or password"})
        return
      }
      console.log(process.env.ADMIN_PASS)
      const isEmailValid = email === process.env.ADMIN_EMAIL;
      const isPasswordValid = await bcrypt.compare(password, process.env.ADMIN_PASS || '');
  
      if (!isEmailValid || !isPasswordValid) {
         res.status(401).json({ message: 'Invalid admin credentials' });
         return
      }
  
      const token = jwt.sign(
        { email, role: 'admin' },
        process.env.JWT_SECRET as string,
        { expiresIn: '1d' }
      );
  
       res.json({
        user: { email, role: 'admin' },
        token,
      });
      return
  
    } catch (err) {
      console.log(err)
       res.status(500).json({ message: 'Something went wrong' });
       return
    }
  }
  
  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        res.status(400).json({ message: "Email and password are required" });
        return;
      }
      const { user, token } = await this.authService.login(email, password);
      res.json({ user, token });
    } catch (err: any) {
      console.error("Login error ", err);
      res.status(401).json({ message: err.message || "Invalid credentials" });
    }
  }
}

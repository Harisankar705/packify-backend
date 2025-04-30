import { Request, Response } from 'express';
import { AuthenticatedRequest, IUserController, IUserService } from '../interfaces/interfaces'; 
export class UserController implements IUserController {
  private userService: IUserService;
  constructor(userService: IUserService) {
    this.userService = userService;
  }
  async getProfile(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      if (!req.user || !req.user.id) {
        res.status(400).json({ message: 'User ID not found in the request' });
        return;
      }
      const user = await this.userService.getById(req.user.id);
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      res.json(user);
    } catch (err) {
      res.status(500).json({ message: (err as Error).message });
    }
  }

  async updateProfile(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      if (!req.user || !req.user.id) {
        res.status(400).json({ message: 'User ID not found in the request' });
        return;
      }
      console.log('in updateprofile',req.body)
      const updated = await this.userService.update(req.user.id, req.body);
      if (!updated) {
        res.status(404).json({ message: 'User not found for update' });
        return;
      }
      res.json(updated);
    } catch (err) {
      res.status(400).json({ message: (err as Error).message });
    }
  }
  async getAllUser(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const users = await this.userService.getAllUser();
      console.log("USERS",users)
      res.status(200).json(users);
    } catch (err) {
      res.status(400).json({ message: (err as Error).message });
    }
  }
  
}

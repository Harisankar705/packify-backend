import { IUser, IUserService } from "../interfaces/interfaces";
import { UserRepository } from "../repository/userRepository";
export class UserService implements IUserService {
  private userRepository: UserRepository;
  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async getById(id: string): Promise<IUser | null> {
    try {
      const user = await this.userRepository.findById(id);
      if (!user) throw new Error("User not found");
      return user;
    } catch (err) {
      throw new Error(`Error fetching user: ${(err as Error).message}`);
    }
  }
  async getAllUser():Promise<IUser[]>{
    return await this.userRepository.find()
}

  async update(id: string, data: Partial<IUser>): Promise<IUser | null> {
    try {
      const updatedUser = await this.userRepository.updateUser(id, data);
      if (!updatedUser) throw new Error("User not found or not updated");
      return updatedUser;
    } catch (err) {
      throw new Error(`Error updating user: ${(err as Error).message}`);
    }
  }
}

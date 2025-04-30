import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

import { IAuthService, IUser, IUserRepository } from '../interfaces/interfaces';
export class AuthService implements IAuthService {
    private userRepository: IUserRepository;
    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    async register(data: Partial<IUser>): Promise<IUser> {
        if (!data.email || !data.password) {
            throw new Error('Email and password are required');
        }
        const existingUser = await this.userRepository.findByEmail(data.email);
        if (existingUser) throw new Error('Email already exists');
        data.password = await bcrypt.hash(data.password, 10);
        const user = await this.userRepository.createUser(data);
        return user;
    }

    async login(email: string, password: string): Promise<{ user: IUser; token: string }> {
        const user = await this.userRepository.findByEmail(email);
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new Error('Invalid credentials');
        }
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET as string,
            { expiresIn: '1d' }
        );
        return { user, token };
    }
   
      
    async verifyGoogleToken(token: string) {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.AUTH_GOOGLE_ID
        })
        return ticket.getPayload()
    }

    async authenticateGoogleUser(token: string) {

        const payload = await this.verifyGoogleToken(token);

        if (!payload) {
            throw new Error("Invalid Google token!");
        }

        const { email, sub: googleId, name, picture } = payload;

        let user = await this.userRepository.findByEmail(email as string);

        if (!user) {
            user = await this.userRepository.createUser({
                email,
                googleId,
                name: name,
                profilePic: picture,
            });
        }


        const accessToken = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.ACCESS_TOKEN_SECRET!,
            { expiresIn: "7d" }
        );

        const refreshToken = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_REFRESH_SECRET!,
            { expiresIn: "7d" }
        );


        return { user, accessToken, refreshToken };
    }

}

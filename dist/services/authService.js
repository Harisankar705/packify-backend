"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const google_auth_library_1 = require("google-auth-library");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const client = new google_auth_library_1.OAuth2Client(process.env.AUTH_GOOGLE_ID);
console.log("JWT_SECRET: ", process.env.JWT_SECRET);
class AuthService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    register(data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!data.email || !data.password) {
                throw new Error('Email and password are required');
            }
            const existingUser = yield this.userRepository.findByEmail(data.email);
            if (existingUser)
                throw new Error('Email already exists');
            data.password = yield bcryptjs_1.default.hash(data.password, 10);
            const user = yield this.userRepository.createUser(data);
            return user;
        });
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findByEmail(email);
            if (!user || !(yield bcryptjs_1.default.compare(password, user.password))) {
                throw new Error('Invalid credentials');
            }
            const token = jsonwebtoken_1.default.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
            return { user, token };
        });
    }
    verifyGoogleToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const ticket = yield client.verifyIdToken({
                idToken: token,
                audience: process.env.AUTH_GOOGLE_ID
            });
            return ticket.getPayload();
        });
    }
    authenticateGoogleUser(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = yield this.verifyGoogleToken(token);
            if (!payload) {
                throw new Error("Invalid Google token!");
            }
            const { email, sub: googleId, name, picture } = payload;
            let user = yield this.userRepository.findByEmail(email);
            if (!user) {
                user = yield this.userRepository.createUser({
                    email,
                    googleId,
                    name,
                    profilePic: picture,
                });
            }
            const accessToken = jsonwebtoken_1.default.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
            return { user, accessToken };
        });
    }
}
exports.AuthService = AuthService;

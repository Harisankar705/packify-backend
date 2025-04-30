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
exports.AuthController = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const google_auth_library_1 = require("google-auth-library");
const client = new google_auth_library_1.OAuth2Client(process.env.AUTH_GOOGLE_ID);
console.log();
class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.authService.register(req.body);
                res.status(201).json(user);
                console.log("registered");
            }
            catch (err) {
                console.error("Registration error ", err);
                res.status(400).json({ message: err.message || "Registration failed" });
            }
        });
    }
    googleLogin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { token } = req.body;
                if (!token) {
                    res.status(400).json({ success: false, message: "Token is required!" });
                    return;
                }
                const ticket = yield client.verifyIdToken({
                    idToken: token,
                    audience: process.env.AUTH_GOOGLE_ID,
                });
                const payload = ticket.getPayload();
                if (!payload) {
                    res
                        .status(401)
                        .json({ success: false, message: "Invalid Google token!" });
                    return;
                }
                const { user, accessToken } = yield this.authService.authenticateGoogleUser(token);
                res.json({ success: true, user, token: accessToken });
            }
            catch (error) {
                console.error("Google login error:", error);
                res
                    .status(500)
                    .json({ success: false, message: "Internal Server Error" });
            }
        });
    }
    adminLogin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.body);
                const { email, password } = req.body;
                console.log("IN ADMINLOGIN");
                console.log;
                if (!email || !password) {
                    res.status(404).json({ message: "Invalid email or password" });
                    return;
                }
                console.log(process.env.ADMIN_PASS);
                const isEmailValid = email === process.env.ADMIN_EMAIL;
                const isPasswordValid = yield bcryptjs_1.default.compare(password, process.env.ADMIN_PASS || '');
                if (!isEmailValid || !isPasswordValid) {
                    res.status(401).json({ message: 'Invalid admin credentials' });
                    return;
                }
                const token = jsonwebtoken_1.default.sign({ email, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1d' });
                res.json({
                    user: { email, role: 'admin' },
                    token,
                });
                return;
            }
            catch (err) {
                console.log(err);
                res.status(500).json({ message: 'Something went wrong' });
                return;
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                if (!email || !password) {
                    res.status(400).json({ message: "Email and password are required" });
                    return;
                }
                const { user, token } = yield this.authService.login(email, password);
                res.json({ user, token });
            }
            catch (err) {
                console.error("Login error ", err);
                res.status(401).json({ message: err.message || "Invalid credentials" });
            }
        });
    }
}
exports.AuthController = AuthController;

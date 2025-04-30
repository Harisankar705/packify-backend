"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const protect = (roles = []) => {
    return (req, res, next) => {
        const authHeader = req.headers.authorization;
        const token = authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(' ')[1];
        if (!token) {
            res.status(401).json({ message: 'No token provided' });
            return;
        }
        jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err || !decoded || typeof decoded === 'string') {
                res.status(403).json({ message: 'Invalid token' });
                return;
            }
            req.user = decoded;
            if (roles.length > 0 && !roles.includes(req.user.role)) {
                res.status(403).json({ message: 'Access Denied' });
                return;
            }
            next();
        });
    };
};
exports.default = protect;

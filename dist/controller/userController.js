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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    getProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.user || !req.user.id) {
                    res.status(400).json({ message: 'User ID not found in the request' });
                    return;
                }
                const user = yield this.userService.getById(req.user.id);
                if (!user) {
                    res.status(404).json({ message: 'User not found' });
                    return;
                }
                res.json(user);
            }
            catch (err) {
                res.status(500).json({ message: err.message });
            }
        });
    }
    updateProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.user || !req.user.id) {
                    res.status(400).json({ message: 'User ID not found in the request' });
                    return;
                }
                console.log('in updateprofile', req.body);
                const updated = yield this.userService.update(req.user.id, req.body);
                if (!updated) {
                    res.status(404).json({ message: 'User not found for update' });
                    return;
                }
                res.json(updated);
            }
            catch (err) {
                res.status(400).json({ message: err.message });
            }
        });
    }
    getAllUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.userService.getAllUser();
                console.log("USERS", users);
                res.status(200).json(users);
            }
            catch (err) {
                res.status(400).json({ message: err.message });
            }
        });
    }
}
exports.UserController = UserController;

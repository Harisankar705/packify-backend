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
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const cloudinary_1 = require("cloudinary");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const router = express_1.default.Router();
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage });
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
router.post('/', upload.single('file'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const fileStr = (_a = req.file) === null || _a === void 0 ? void 0 : _a.buffer.toString('base64');
        const uploadRes = yield cloudinary_1.v2.uploader.upload(`data:${(_b = req.file) === null || _b === void 0 ? void 0 : _b.mimetype};base64,${fileStr}`, {
            folder: 'profile_pics',
        });
        res.json({ url: uploadRes.secure_url });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to upload image' });
    }
}));
exports.default = router;

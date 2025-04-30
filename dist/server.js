"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const bookingRoutes_1 = __importDefault(require("./routes/bookingRoutes"));
const packageRoutes_1 = __importDefault(require("./routes/packageRoutes"));
const db_1 = require("./config/db");
const upload_1 = __importDefault(require("./routes/upload"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
(0, db_1.dbConnection)();
app.use((0, cors_1.default)({
    origin: [
        'http://localhost:8080',
    ],
    credentials: true
}));
app.use('/api/auth', authRoutes_1.default);
app.use('/api/users', userRoutes_1.default);
app.use('/api/bookings', bookingRoutes_1.default);
app.use('/api/packages', packageRoutes_1.default);
app.use('/api/upload', upload_1.default);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

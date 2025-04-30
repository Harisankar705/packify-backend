import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';
import bookingRoutes from './routes/bookingRoutes';
import packageRoutes from './routes/packageRoutes';
import { dbConnection } from './config/db';
dotenv.config();
const app = express();
app.use(express.json());
dbConnection();
app.use(cors({
  origin: [
    'http://localhost:8080',
  ],
  credentials: true
}));
app.use('/api/auth', authRoutes); 
app.use('/api/users', userRoutes); 
app.use('/api/bookings', bookingRoutes); 
app.use('/api/packages', packageRoutes); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

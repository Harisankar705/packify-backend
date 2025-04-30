  import express from 'express';
  import dotenv from 'dotenv';
  import cors from 'cors'
  import userRoutes from './routes/userRoutes';
  import authRoutes from './routes/authRoutes';
  import bookingRoutes from './routes/bookingRoutes';
  import packageRoutes from './routes/packageRoutes';
  import { dbConnection } from './config/db';
  import uploadRoute from './routes/upload';
  dotenv.config();
  const app = express();
  app.use(express.json());
  dbConnection();
  const allowedOrigins = [
    'http://localhost:8080',
    'https://packify-peach.vercel.app',
  ];
  
  app.use(cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));
  
  app.use('/api/auth', authRoutes); 
  app.use('/api/users', userRoutes); 
  app.use('/api/bookings', bookingRoutes); 
  app.use('/api/packages', packageRoutes); 
  app.use('/api/upload', uploadRoute);

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

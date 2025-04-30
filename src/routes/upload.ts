
import express from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();
const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
router.post('/', upload.single('file'), async (req, res) => {
  try {
    const fileStr = req.file?.buffer.toString('base64');
    const uploadRes = await cloudinary.uploader.upload(`data:${req.file?.mimetype};base64,${fileStr}`, {
      folder: 'profile_pics',
    });
    res.json({ url: uploadRes.secure_url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to upload image' });
  }
});
export default router;

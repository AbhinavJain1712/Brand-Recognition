import multer from 'multer';
import detection from './detection.js';
import express from 'express';

const router = express.Router();

// Configure multer to use MemoryStorage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Add routes
router.get('/', (req, res) => {
  res.json("Hello, your backend is running!");
});

router.post('/', upload.single('image'), detection);

export default router;

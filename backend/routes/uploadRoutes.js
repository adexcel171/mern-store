import express from 'express';
import multer from 'multer';
import path from 'path';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const router = express.Router();



const storageConfig = multer.memoryStorage();
const upload = multer({ storage: storageConfig });

router.post('/', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send({ message: 'No image file provided' });
    }

    const fileBuffer = req.file.buffer;
    const fileName = `${Date.now()}_${req.file.originalname}`;
    const storageRef = ref(storage, `images/${fileName}`);

    // Upload the file to Firebase Storage
    await uploadBytes(storageRef, fileBuffer);

    // Get the download URL for the uploaded image
    const downloadURL = await getDownloadURL(storageRef);

    res.status(200).send({
      message: 'Image uploaded successfully',
      imageUrl: downloadURL,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error uploading image' });
  }
});

export default router;

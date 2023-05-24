import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { uploadSingleVideo } from '../middlewares/uploadVideoMiddleware';
import deepfake from '../models/deepfakeModel';

// @desc    Upload Single image for deepfake
// @route   POST /api/v1/brands/:id/deepfake
// @access  Private
export const uploaddeepfakeVideo = uploadSingleVideo('video');

// @desc    Create list of deepfake
// @route   Post /api/v1/deepfake
// @access  Private
export const createdeepfake = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
        if (!req.file) {
            res.status(400).json({ error: 'No file uploaded.' });
            return;
        }
        // Access the uploaded file using req.file
        const uploadedFile = req.file;
        console.log('Uploaded file:', uploadedFile);
        console.log('File name:', uploadedFile.originalname);
        console.log('File size:', uploadedFile.size);
        console.log('File MIME type:', uploadedFile.mimetype);
        // Process the uploaded video here (e.g., save to a database, perform operations, etc.)
        req.body.video = uploadedFile.originalname;
        console.log(req.body.video);
        const document = await deepfake.create({ video: req.body.video });
        res.status(201).render('deepfake', { data: document ,message:'Deepfake Created Successfully'});
    }
);

import { NextFunction, Request, Response } from 'express';
import express from 'express';
import asyncHandler from 'express-async-handler';
import { Server } from 'socket.io';
import {
    uploadSingleVideo,
    take_thumbnail,
} from '../middlewares/uploadVideoMiddleware';
import deepfake from '../models/deepfakeModel';
// Express app
const app = express();
// Socket.io connection
const serverio = require('http').createServer(app);
const io = new Server(serverio, {
    cors: {
        origin: '*',
        methods: '*',
        credentials: true,
    },
});
let predict = '';
io.on('connection', async (socket) => {
    socket.on('prediction', async (prediction) => {
        predict = prediction;
        console.log(prediction);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});
serverio.listen(3000, () => {
    console.log('server is running......');
});

// @desc    Upload Single image for deepfake
// @route   POST /api/v1/deepfake/:id/deepfake
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
        // Process the uploaded video here (e.g., save to a database, perform operations, etc.)
        req.body.video = uploadedFile.originalname;

        take_thumbnail(uploadedFile.originalname);

        //console.log(req.body.video);
        io.emit('data', req.body.video);
        const document = await deepfake.create({ video: req.body.video });
        res.status(201).json({ data: document });
    }
);

// @desc    Get Single video for deepfake
// @route   Get /api/v1/deepfake
// @access  Public
export const getPredict = (req: Request, res: Response, next: NextFunction) => {
    // if (!predict) {
    //     setTimeout(() => {
    //       getPredict(req, res, next);
    //     }, 100);
    //    } else {
    //     res.render('deepfake', { message: predict });
    //    }
    res.render('deepfake', { message: 'FAKE' });
};

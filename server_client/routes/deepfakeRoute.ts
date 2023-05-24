import express from 'express';
import {
    createdeepfake,
    uploaddeepfakeVideo,
} from '../controllers/DeepfakeController';
import {
    createdeepfakeValidator,
} from '../utils/validators/deepfakeValidator';

const router = express.Router();

router
    .route('/')
    .post(
        uploaddeepfakeVideo,
        createdeepfakeValidator,
        createdeepfake
    );
export default router;

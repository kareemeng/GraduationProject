import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import ffmpeg from 'ffmpeg';
import { Request } from 'express';
import ApiError from '../utils/apiError';

export const take_thumbnail = (filename: string) => {
    const videoPromise = new ffmpeg(`deepfake/${filename}`);

    videoPromise.then((video: any) => {
        const thumbnailPath = `/thumbnail/${filename}-thumbnail.jpg`;
        video.takeScreenshots(
            {
                count: 1,
                timemarks: ['1'], // number of seconds
            },
            thumbnailPath,
            function (err: Error) {
                if (err) {
                    console.log('error generating thumbnail', err);
                } else {
                    console.log(`thumbnail saved at ${thumbnailPath}`);
                }
            }
        );
    });
    console.log('done');
};

const multerOptions = () => {
    // 1- Disk Storage Engine
    const multerStorage = multer.diskStorage({
        destination: (
            req: Request,
            file: Express.Multer.File,
            cb: Function
        ) => {
            cb(null, 'uploads/deepfake/');
        },
        filename: (req: Request, file: Express.Multer.File, cb: Function) => {
            // const ext = file.mimetype.split('/')[1];
            // const filename = `deepfake-${uuidv4()}-${Date.now()}.${ext}`;
            const filename = file.originalname;
            console.log(filename);
            cb(null, filename);
        },
    });

    // 2- Memory Storage Engine

    const multerFilter = (
        req: Request,
        file: Express.Multer.File,
        cb: Function
    ) => {
        if (file.mimetype.startsWith('video')) {
            cb(null, true);
        } else {
            cb(
                new ApiError('Not an video! Please upload only videos.', 400),
                false
            );
        }
    };

    const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

    return upload;
};

export const uploadSingleVideo = (fieldName: any) => {
    return multerOptions().single(fieldName);
};
function err(reason: any): PromiseLike<never> {
    throw new Error('Function not implemented.');
}

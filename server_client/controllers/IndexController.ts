import { NextFunction, Request, Response } from 'express';

export const get_home = (req: Request, res: Response, next: NextFunction) => {
    res.render('index', { title: 'Express' });
};

export const getScanner = (req: Request, res: Response, next: NextFunction) => {
    res.render('scanner', { title: 'Express' });
};

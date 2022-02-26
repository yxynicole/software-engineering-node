import {Request, Response} from "express";


export default interface LikeControllerI {
    findLikedUsersByTuit(req: Request, res: Response): void;
    findLikedTuitsByUser(req: Request, res: Response): void;
    createLike(req: Request, res: Response): void;
    deleteLike(req: Request, res: Response): void;
}
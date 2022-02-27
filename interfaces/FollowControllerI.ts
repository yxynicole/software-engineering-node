import {Request, Response} from "express";

export default interface FollowControllerI{
    createFollow(req: Request, res: Response): void;
    deleteFollow(req: Request, res: Response): void;
    findFolloweesByUser(req: Request, res: Response): void;
    findFollowersByUser(req: Request, res: Response): void;
}
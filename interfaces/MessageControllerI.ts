import {Request, Response} from "express";

export default interface MessageControllerI{
    createMessage (req: Request, res: Response): void;
    deleteMessage (req: Request, res: Response): void;
    findSentMessagesByUser(req: Request, res: Response): void;
    findReceivedMessagesByUser(req: Request, res: Response): void;
}
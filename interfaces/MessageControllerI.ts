import {Request, Response} from "express";
/**
 * messageController interface
 *
 * @interface
 */
export default interface MessageControllerI{
    /**
     * Create a message object
     * @param req
     * @param res
     */
    createMessage (req: Request, res: Response): void;

    /**
     * Delete a message object
     * @param req
     * @param res
     */
    deleteMessage (req: Request, res: Response): void;

    /**
     * Find sent messages by a user
     * @param req
     * @param res
     */
    findSentMessagesByUser(req: Request, res: Response): void;

    /**
     * Find received messages by a user
     * @param req
     * @param res
     */
    findReceivedMessagesByUser(req: Request, res: Response): void;
}
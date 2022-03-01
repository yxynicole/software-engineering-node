import {Request, Response} from "express";

/**
 * followController Interface
 *
 * @interface
 */
export default interface FollowControllerI{
    /**
     * Create a following object
     * @param req {Request}
     * @param res {Response}
     */
    createFollowing(req: Request, res: Response): void;

    /**
     * Delete a following object
     * @param req {Request}
     * @param res {Response}
     */
    deleteFollowing(req: Request, res: Response): void;

    /**
     * Retrieve all followees by user id
     * @param req {Request}
     * @param res {Response}
     */
    findFolloweesByUser(req: Request, res: Response): void;

    /**
     *Retrieve all followers by user id
     * @param req {Request}
     * @param res {Response}
     */
    findFollowersByUser(req: Request, res: Response): void;
}
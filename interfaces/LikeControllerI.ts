import {Request, Response} from "express";
/**
 *  likeController interface
 *
 * @interface
 */
export default interface LikeControllerI {
    /**
     *Retrieve all users by the tuit
     * @param req
     * @param res
     */
    findLikedUsersByTuit(req: Request, res: Response): void;

    /**
     *Retrieve all tuits by the user
     * @param req
     * @param res
     */
    findLikedTuitsByUser(req: Request, res: Response): void;

    /**
     * Create a like object
     * @param req
     * @param res
     */
    createLike(req: Request, res: Response): void;

    /**
     * Delete a like object
     * @param req
     * @param res
     */
    deleteLike(req: Request, res: Response): void;
}
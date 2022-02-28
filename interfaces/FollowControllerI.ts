import {Request, Response} from "express";

/**
 * Interface for class Following that represents a follow relation
 *
 * @interface
 */
export default interface FollowControllerI{
    /**
     * Create a following object that represents the following relationship between the follower and the followee
     * @param req {Request} The request parameter contains the followerId, and its body contains the followeeId
     * @param res {Response} The response contains the newly created following object
     */
    createFollowing(req: Request, res: Response): void;

    /**
     * Delete a following object that represents the following relationship between the follower and the followee
     * @param req {Request} The request parameter contains the followerId, and its body contains the followeeId
     * @param res {Response} The response contains either deletion count or failure code
     */
    deleteFollowing(req: Request, res: Response): void;

    /**
     * Retrieve all followees who are following by the follower(user)
     * @param req {Request} The request parameter contains the followerId(uid).
     * @param res {Response} The response contains an array of followee objects.
     */
    findFolloweesByUser(req: Request, res: Response): void;

    /**
     *Retrieve all followers who are following the followee(user)
     * @param req {Request} The request parameter contains the followeeId(uid).
     * @param res {Response} The response contains an array of follower objects.
     */
    findFollowersByUser(req: Request, res: Response): void;
}
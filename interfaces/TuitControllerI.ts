import {Request, Response} from "express";
/**
 * tuitController interface
 *
 * @interface
 */
export default interface TuitControllerI {
    /**
     * Find all tuits
     * @param req
     * @param res
     */
    findAllTuits(req: Request, res: Response): void;

    /**
     * Find tuit by a tuit id
     * @param req
     * @param res
     */
    findTuitById(req: Request, res: Response): void;

    /**
     * Find tuit by a user
     * @param req
     * @param res
     */
    findTuitsByUser(req: Request, res: Response): void;

    /**
     * Create a tuit
     * @param req
     * @param res
     */
    createTuit(req: Request, res: Response): void;

    /**
     * Update a tuit
     * @param req
     * @param res
     */
    updateTuit(req: Request, res: Response): void;

    /**
     * delete a tuit
     * @param req
     * @param res
     */
    deleteTuit(req: Request, res: Response): void;
}

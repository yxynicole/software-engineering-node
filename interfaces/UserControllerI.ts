import {Request, Response} from "express";

/**
 * UserController interface
 *
 * @interface
 */
export default interface UserControllerI {
    /**
     * find all users
     * @param req
     * @param res
     */
    findAllUsers(req: Request, res: Response): void;

    /**
     * Find a user by user id
     * @param req
     * @param res
     */
    findUserById(req: Request, res: Response): void;

    /**
     * create a user
     * @param req
     * @param res
     */
    createUser(req: Request, res: Response): void;

    /**
     * delete a user
     * @param req
     * @param res
     */
    deleteUser(req: Request, res: Response): void;

    /**
     * update a user info
     * @param req
     * @param res
     */
    updateUser(req: Request, res: Response): void;
}

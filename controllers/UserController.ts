import {Request, Response, Express} from "express";
import UserDao from "../daos/UserDao";
import UserControllerI from "../interfaces/UserControllerI";
/**
 * Class representing a UserController with UserDao
 *
 * @class
 * @implements{UserControllerI}
 */
export default class UserController implements UserControllerI {
    app: Express;
    userDao: UserDao;

    /**
     * Create a userController listening on the app
     * @param {Express} app Express server application.
     */
    constructor(app: Express) {
        this.app = app;
        this.userDao = new UserDao();
        this.app.get('/users', this.findAllUsers);
        this.app.get('/users/:userid', this.findUserById);
        this.app.post('/users', this.createUser);
        this.app.delete('/users/:userid', this.deleteUser);
        this.app.put('/users/:userid', this.updateUser);
    }
    findAllUsers = (req: Request, res: Response) =>
        this.userDao.findAllUsers()
            .then(users => res.json(users))
            .catch(error => res.status(422).json(error));

    findUserById = (req: Request, res: Response) =>
        this.userDao.findUserById(req.params.userid)
            .then(user => res.json(user))
            .catch(error => res.status(422).json(error));

    createUser = (req: Request, res: Response) =>
        this.userDao.createUser(req.body)   // body has been parsed by middleware defined in server.ts
            .then(user => res.json(user))
            .catch(error => res.status(422).json(error));

    deleteUser = (req: Request, res: Response) =>
        this.userDao.deleteUser(req.params.userid)
            .then(status => res.json(status))
            .catch(error => res.status(422).json(error));

    updateUser = (req: Request, res: Response) =>
        this.userDao.updateUser(req.params.userid, req.body)
            .then(status => res.json(status))
            .catch(error => res.status(422).json(error));
}

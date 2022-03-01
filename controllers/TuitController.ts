import {Request, Response, Express} from "express";
import TuitDao from "../daos/TuitDao";
import TuitControllerI from "../interfaces/TuitControllerI";
/**
 * Class representing a TuitController with TuitDao
 *
 * @class
 * @implements{TuitControllerI}
 */
export default class TuitController implements TuitControllerI {
    app: Express;
    tuitDao: TuitDao;

    constructor(app: Express) {
        this.app = app;
        this.tuitDao = new TuitDao();

        this.app.get('/tuits', this.findAllTuits.bind(this));
        this.app.get('/tuits/:id', this.findTuitById.bind(this));
        this.app.get('/users/:uid/tuits', this.findTuitsByUser.bind(this));
        this.app.post('/tuits', this.createTuit.bind(this));
        this.app.delete('/tuits/:tid', this.deleteTuit.bind(this));
        this.app.put('/tuits/:tid', this.updateTuit.bind(this));
    }

    findAllTuits(req: Request, res: Response) {
        return this.tuitDao.findAllTuits()
            .then(tuits => res.json(tuits))
            .catch(error => res.status(422).json(error));
    }

    findTuitById(req: Request, res: Response) {
        return this.tuitDao.findTuitById(req.params.tuitid)
            .then(tuit => res.json(tuit))
            .catch(error => res.status(422).json(error));
    }

    findTuitsByUser(req: Request, res: Response) {
        return this.tuitDao.findTuitsByUser(req.params.userid)
            .then(tuit => res.json(tuit))
            .catch(error => res.status(422).json(error));
    }

    createTuit(req: Request, res: Response) {
        return this.tuitDao.createTuit(req.body)
            .then(user => res.json(user))
            .catch(error => res.status(422).json(error));
        ;
    }

    deleteTuit(req: Request, res: Response) {
        return this.tuitDao.deleteTuit(req.params.tuitid)
            .then(status => res.json(status))
            .catch(error => res.status(422).json(error));
        ;
    }

    updateTuit(req: Request, res: Response) {
        return this.tuitDao.updateTuit(req.params.tuitid, req.body)
            .then(status => res.json(status))
            .catch(error => res.status(422).json(error));
    }

}
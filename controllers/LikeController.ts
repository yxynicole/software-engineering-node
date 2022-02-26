import {Request, Response, Express} from "express";
import LikeControllerI from "../interfaces/LikeControllerI";
import LikeDao from "../daos/LikeDao";

export default class LikeController implements LikeControllerI {
    likeDao: LikeDao

    constructor() {
        this.likeDao = new LikeDao()
    }

    register(app: Express) {
        app.post('/users/:uid/likes/:tid', this.createLike)
        app.delete('/users/:uid/likes/:tid', this.deleteLike)
        app.get("/users/:uid/likes", this.findLikedTuitsByUser)
        app.get("/tuits/:tid/likes", this.findLikedUsersByTuit)
    }

    createLike = (req: Request, res: Response) => {
        let uid = req.params['uid']
        let tid = req.params['tid']
        this.likeDao.createLike(uid, tid)
            .then(json => res.json(json))
            .catch(err => res.status(422).json(err))
    }

    deleteLike = (req: Request, res: Response) => {
        let uid = req.params['uid']
        let tid = req.params['tid']
        this.likeDao.deleteLike(uid, tid)
            .then(json => res.json(json))
            .catch(err => res.status(422).json(err))
    }

    findLikedUsersByTuit = (req: Request, res: Response) => {
        let tid = req.params['tid']
        this.likeDao.findLikesByTuit(tid)
            .then(likes => res.json(likes.map(like => like.likedBy)))
            .catch(err => res.status(422).json(err))
    }

    findLikedTuitsByUser = (req: Request, res: Response) => {
        let uid = req.params['uid']
        this.likeDao.findLikesByUser(uid)
            .then(likes => res.json(likes.map(like => like.tuit)))
            .catch(err => {
                console.log(err)
                res.status(422).json(err)
            })
    }

}
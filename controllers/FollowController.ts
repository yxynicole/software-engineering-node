import {Request, Response, Express} from "express";
import FollowControllerI from "../interfaces/FollowControllerI";
import FollowDao from "../daos/FollowDao";

export default class FollowController implements FollowControllerI {
    followDao: FollowDao

    constructor() {
        this.followDao = new FollowDao();
    }

    listen(app: Express) {
        app.post('/users/:uid/followings', this.createFollow);
        app.delete('/users/:uid/followings/:followingId', this.deleteFollow);
        app.get('/users/:uid/followees', this.findFolloweesByUser);
        app.get('/users/:uid/followers', this.findFollowersByUser);
    }

    createFollow = (req: Request, res: Response) => {
        let followerId = req.params['uid'];
        let followeeId = req.body.follweeId;
        this.followDao.createFollow(followerId, followeeId)
            .then(follow => res.json(follow))
            .catch(error => res.status(422).json(error));
    }

    deleteFollow = (req: Request, res: Response) => {
        let followerId = req.params['uid'];
        let followeeId = req.params['followingId'];
        this.followDao.deleteFollow(followerId, followeeId)
            .then(follow => res.json(follow))
            .catch(error => res.status(422).json(error));
    }

    findFolloweesByUser = (req: Request, res: Response) => {
        let uid = req.params['uid'];
        this.followDao.findFollowsbyFollower(uid)
            .then(follows => res.json(follows.map(follow => follow.followee)))
            .catch(error => res.status(422).json(error));
    }

    findFollowersByUser = (req: Request, res: Response) =>{
        let uid = req.params['uid'];
        this.followDao.findFollowsbyFollowee(uid)
            .then(follows => res.json(follows.map(follow => follow.follower)))
            .catch(error => res.status(422).json(error));
    }

}

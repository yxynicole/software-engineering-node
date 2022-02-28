import {Request, Response, Express} from "express";
import FollowControllerI from "../interfaces/FollowControllerI";
import FollowDao from "../daos/FollowDao";

export default class FollowController implements FollowControllerI {
    followDao: FollowDao

    constructor() {
        this.followDao = new FollowDao();
    }

    listen(app: Express) {
        app.post('/users/:uid/followings', this.createFollowing);
        app.delete('/users/:uid/followings', this.deleteFollowing);
        app.get('/users/:uid/followees', this.findFolloweesByUser);
        app.get('/users/:uid/followers', this.findFollowersByUser);
    }

    createFollowing = (req: Request, res: Response) => {
        let followerId = req.params['uid'];
        let followeeId = req.body.followeeId;
        console.log("create follow: " , followeeId, req.body);
        this.followDao.createFollow(followerId, followeeId)
            .then(follow => res.json(follow))
            .catch(error => res.status(422).json(error));
    }

    deleteFollowing = (req: Request, res: Response) => {
        let followerId = req.params['uid'];
        let followeeId = req.body.followeeId;
        this.followDao.deleteFollow(followerId, followeeId)
            .then(follow => res.json(follow))
            .catch(error => res.status(422).json(error));
    }

    findFolloweesByUser = (req: Request, res: Response) => {
        let uid = req.params['uid'];
        this.followDao.findFollowsbyFollower(uid)
            .then(follows => {res.json(follows.map(follow => follow.followee))})
            .catch(error => res.status(422).json(error));
    }

    findFollowersByUser = (req: Request, res: Response) =>{
        let uid = req.params['uid'];
        this.followDao.findFollowsbyFollowee(uid)
            .then(follows => res.json(follows.map(follow => follow.follower)))
            .catch(error => res.status(422).json(error));
    }

}

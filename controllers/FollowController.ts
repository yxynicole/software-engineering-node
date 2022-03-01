import {Request, Response, Express} from "express";
import FollowControllerI from "../interfaces/FollowControllerI";
import FollowDao from "../daos/FollowDao";
/**
 * Class representing a FollowController with followDao
 *
 * @class
 * @implements{FollowControllerI}
 */
export default class FollowController implements FollowControllerI {
    followDao: FollowDao

    /**
     * Create a FollowDao object.
     */
    constructor() {
        this.followDao = new FollowDao();
    }

    /**
     * followerController listens on the app
     * @param {Express} app Express server application.
     */
    listen(app: Express) {
        app.post('/users/:uid/followings', this.createFollowing);
        app.delete('/users/:uid/followings', this.deleteFollowing);
        app.get('/users/:uid/followees', this.findFolloweesByUser);
        app.get('/users/:uid/followers', this.findFollowersByUser);
    }

    /**
     * Create a following object that represents the following relationship between the follower and the followee
     * @param req {Request} The request contains the followerId, and its body contains the followeeId
     * @param res {Response} The response contains the newly created following object
     */
    createFollowing = (req: Request, res: Response) => {
        let followerId = req.params['uid'];
        let followeeId = req.body.followeeId;
        console.log("create follow: " , followeeId, req.body);
        this.followDao.createFollow(followerId, followeeId)
            .then(follow => res.json(follow))
            .catch(error => res.status(422).json(error));
    }

    /**
     * Delete a following object that represents the following relationship between the follower and the followee
     * @param req {Request} The request parameter contains the followerId, and its body contains the followeeId
     * @param res {Response} The response contains either deletion count or failure code
     */
    deleteFollowing = (req: Request, res: Response) => {
        let followerId = req.params['uid'];
        let followeeId = req.body.followeeId;
        this.followDao.deleteFollow(followerId, followeeId)
            .then(follow => res.json(follow))
            .catch(error => res.status(422).json(error));
    }

    /**
     * Retrieve all followees who are following by the follower(user)
     * @param req {Request} The request parameter contains the followerId(uid).
     * @param res {Response} The response contains an array of followee objects.
     */
    findFolloweesByUser = (req: Request, res: Response) => {
        let uid = req.params['uid'];
        this.followDao.findFollowsbyFollower(uid)
            .then(follows => {res.json(follows.map(follow => follow.followee))})
            .catch(error => res.status(422).json(error));
    }

    /**
     *Retrieve all followers who are following the followee(user)
     * @param req {Request} The request parameter contains the followeeId(uid).
     * @param res {Response} The response contains an array of follower objects.
     */
    findFollowersByUser = (req: Request, res: Response) =>{
        let uid = req.params['uid'];
        this.followDao.findFollowsbyFollowee(uid)
            .then(follows => res.json(follows.map(follow => follow.follower)))
            .catch(error => res.status(422).json(error));
    }

}

/**
 * @file Controller RESTful Web service API for likes resource
 */
import {Express, Request, Response} from "express";
import LikeDao from "../daos/LikeDao";
import LikeControllerI from "../interfaces/LikeControllerI";
import TuitDao from "../daos/TuitDao";
import DislikeDao from "../daos/DislikeDao";

/**
 * @class TuitController Implements RESTful Web service API for likes resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /api/users/:uid/likes to retrieve all the tuits liked by a user
 *     </li>
 *     <li>GET /api/tuits/:tid/likes to retrieve all users that liked a tuit
 *     </li>
 *     <li>POST /api/users/:uid/likes/:tid to record that a user likes a tuit
 *     </li>
 *     <li>DELETE /api/users/:uid/unlikes/:tid to record that a user
 *     no londer likes a tuit</li>
 * </ul>
 * @property {LikeDao} likeDao Singleton DAO implementing likes CRUD operations
 * @property {LikeController} LikeController Singleton controller implementing
 * RESTful Web service API
 */
export default class LikeController implements LikeControllerI {
    private static likeDao: LikeDao = LikeDao.getInstance();
    private static dislikeDao: DislikeDao = DislikeDao.getInstance();
    private static tuitDao: TuitDao = TuitDao.getInstance();
    private static likeController: LikeController | null = null;
    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return TuitController
     */
    public static getInstance = (app: Express): LikeController => {
        if (LikeController.likeController === null) {
            LikeController.likeController = new LikeController();
            app.get("/api/users/:uid/likes", LikeController.likeController.findAllTuitsLikedByUser);
            app.get("/api/users/:uid/dislikes", LikeController.likeController.findAllTuitsDislikedByUser)
            app.get("/api/tuits/:tid/likes", LikeController.likeController.findAllUsersThatLikedTuit);
            app.post("/api/users/:uid/likes/:tid", LikeController.likeController.userLikesTuit);
            app.delete("/api/users/:uid/unlikes/:tid", LikeController.likeController.userUnlikesTuit);
            app.put("/api/users/:uid/likes/:tid", LikeController.likeController.userTogglesTuitLikes);
            app.put("/api/users/:uid/dislikes/:tid", LikeController.likeController.userTogglesTuitDislikes);
        }
        return LikeController.likeController;
    }

    private constructor() {
    }

    /**
     * Retrieves all users that liked a tuit from the database
     * @param {Request} req Represents request from client, including the path
     * parameter tid representing the liked tuit
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects
     */
    findAllUsersThatLikedTuit = (req: Request, res: Response) =>
        LikeController.likeDao.findAllUsersThatLikedTuit(req.params.tid)
            .then(likes => res.json(likes)).catch(err => res.status(422).json(err));

    /**
     * Retrieves all tuits liked by a user from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user liked the tuits
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the tuit objects that were liked
     */
    findAllTuitsLikedByUser = (req: Request, res: Response) => {
        const uid = req.params.uid;
        // @ts-ignore
        const profile = req.session['profile'];
        const userId = uid === "me" && profile ?
            profile._id : uid;
        if (!profile || userId !== profile._id) {
            res.status(403)
            return
        }
        return LikeController.likeDao.findAllTuitsLikedByUser(userId)
            .then(likes => {
                const likesNonNullTuits =
                    likes.filter(like => like.tuit);
                const tuitsFromLikes =
                    likesNonNullTuits.map(like => like.tuit);
                res.json(tuitsFromLikes);
            })
            .catch(err => {
                res.status(422)
            });
    }

    findAllTuitsDislikedByUser = (req: Request, res: Response) => {
        const uid = req.params.uid;
        // @ts-ignore
        const profile = req.session['profile'];
        const userId = uid === "me" && profile ?
            profile._id : uid;
        if (!profile || userId !== profile._id) {
            res.status(403)
            return
        }
        return LikeController.dislikeDao.findAllTuitsDislikedByUser(userId)
            .then(dislikes => {
                const dislikesNonNullTuits =
                    dislikes.filter(dislikes => dislikes.tuit);
                const tuitsFromDisLikes =
                    dislikesNonNullTuits.map(dislikes => dislikes.tuit);
                res.json(tuitsFromDisLikes);
            })
            .catch(err => {
                res.status(422)
            });
    }

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid and tid representing the user that is liking the tuit
     * and the tuit being liked
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new likes that was inserted in the
     * database
     */
    userLikesTuit = (req: Request, res: Response) => {
        const uid = req.params.uid;
        // @ts-ignore
        const profile = req.session['profile'];
        const userId = uid === "me" && profile ? profile._id : uid;

        if (profile && userId === profile._id) {
            return LikeController.likeDao.userLikesTuit(userId, req.params.tid)
                .then(() => LikeController.tuitDao.updateTuitStats(req.params.tid, {$inc: {"stats.likes": 1}}))
                .then(r => res.json(r)).catch(err => {
                    console.log(err)
                    res.status(422).json(err)
                });
        } else {
            res.status(403);
        }

    }

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid and tid representing the user that is unliking
     * the tuit and the tuit being unliked
     * @param {Response} res Represents response to client, including status
     * on whether deleting the like was successful or not
     */
    userUnlikesTuit = (req: Request, res: Response) =>
        LikeController.likeDao.userUnlikesTuit(req.params.uid, req.params.tid)
            .then(status => res.send(status)).catch(err => res.status(422).json(err));

    userTogglesTuitLikes = async (req: Request, res: Response) => {
        const uid = req.params.uid;
        const tid = req.params.tid;
        // @ts-ignore
        const profile = req.session['profile'];
        const userId = uid === "me" && profile ?
            profile._id : uid;
        try {
            const users = await LikeController.likeDao
                .findAllUsersThatLikedTuit(tid);
            const howManyLikedTuit = users.length;
            let tuit = await LikeController.tuitDao.findTuitById(tid);
            // @ts-ignore
            if (users.filter(u => u.likedBy._id.equals(userId)).length > 0) {
                await LikeController.likeDao.userUnlikesTuit(userId, tid);
                tuit.stats.likes = howManyLikedTuit - 1;
            } else {
                await LikeController.likeDao.userLikesTuit(userId, tid);
                tuit.stats.likes = howManyLikedTuit + 1;
            }
            await LikeController.tuitDao.updateTuitStats(tid, tuit.stats);
            res.sendStatus(200);
        } catch (e) {
            res.sendStatus(404);
        }
    }

    userTogglesTuitDislikes = async (req: Request, res: Response) => {
        const uid = req.params.uid;
        const tid = req.params.tid;
        // @ts-ignore
        const profile = req.session['profile'];
        const userId = uid === "me" && profile ?
            profile._id : uid;
        try {
            const users = await LikeController.dislikeDao
                .findAllUsersThatDislikedTuit(tid);
            const howManyDislikedTuit = users.length;
            let tuit = await LikeController.tuitDao.findTuitById(tid);
            // @ts-ignore
            if (users.filter(u => u.dislikedBy._id.equals(userId)).length > 0) {
                await LikeController.dislikeDao.userUndislikesTuit(userId, tid);
                tuit.stats.dislikes = howManyDislikedTuit - 1;
            } else {
                await LikeController.dislikeDao.userDisikesTuit(userId, tid);
                tuit.stats.dislikes = howManyDislikedTuit + 1;
            }
            await LikeController.tuitDao.updateTuitStats(tid, tuit.stats);
            res.sendStatus(200);
        } catch (e) {
            res.sendStatus(500);
        }
    }
};
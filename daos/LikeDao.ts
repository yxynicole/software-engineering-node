import LikeDaoI from "../interfaces/LikeDaoI";
import Like from "../models/Like";
import LikeModel from "../mongoose/LikeModel";
import {ObjectId} from "mongodb"

/**
 *  Implementation of LikeDaoI
 *
 */
export default class LikeDao implements LikeDaoI {
    async createLike(uid: string, tid: string): Promise<Like> {
        return LikeModel.create({
            tuit: tid,
            likedBy: uid,
        })
    }

    async deleteLike(uid: string, tid: string): Promise<any> {
        return LikeModel.deleteOne({
            tuit: tid,
            likedBy: uid,
        })
    }

    async findLikesByTuit(tid: string): Promise<Like[]> {
        return LikeModel.find({
            tuit: new ObjectId(tid)
        }).populate('likedBy').populate('tuit')
    }

    async findLikesByUser(uid: string): Promise<Like[]> {
        return LikeModel.find({
            likedBy: new ObjectId(uid),
        }).populate('likedBy').populate('tuit')
    }
}
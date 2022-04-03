import DislikeModel from "../mongoose/likes/DislikeModel";
import Dislike from "../models/likes/Dislike";
export default class DislikeDao {
    private static dislikeDao: DislikeDao | null = null;
    public static getInstance = (): DislikeDao => {
        if(DislikeDao.dislikeDao === null) {
            DislikeDao.dislikeDao = new DislikeDao();
        }
        return DislikeDao.dislikeDao;
    }
    private constructor() {}

    findAllUsersThatDislikedTuit = async (tid: string): Promise<Dislike[]> =>
        DislikeModel
            .find({tuit: tid})
            .populate("dislikedBy")
            .exec();
    // findAllUsersThatDislikedTuit = async (tid: string): Promise<Like[]> =>
    //     LikeModel
    //         .find({tuit: tid})
    //         .populate("likedBy")
    //         .exec();
    findAllTuitsDislikedByUser = async (uid: string): Promise<Dislike[]> =>
        DislikeModel
            .find({dislikedBy: uid})
            .populate("tuit")
            .exec();
    userDisikesTuit = async (uid: string, tid: string): Promise<any> =>
        DislikeModel.create({tuit: tid, dislikedBy: uid});
    userUndislikesTuit = async (uid: string, tid: string): Promise<any> =>
        DislikeModel.deleteOne({tuit: tid, dislikedBy: uid});

    userToggleDislike = async  (uid: string, tid: string): Promise<any> =>
        DislikeModel.find({tuit: tid, dislikedBy: uid}).then(r => !(!r))
}
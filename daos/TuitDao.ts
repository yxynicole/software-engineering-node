/**
 * @file Implements DAO managing data storage of tuits. Uses mongoose TuitModel
 * to integrate with MongoDB
 */
import TuitModel from "../mongoose/tuits/TuitModel";
import Tuit from "../models/tuits/Tuit";
import TuitDaoI from "../interfaces/TuitDaoI";
import BookmarkModel from "../mongoose/bookmarks/BookmarkModel";
import TagAssociation from "../models/TagAssociation";
import TagAssociationModel from "../mongoose/tags/TagAssociationModel";

/**
 * @class UserDao Implements Data Access Object managing data storage
 * of Users
 * @property {UserDao} userDao Private single instance of UserDao
 */
export default class TuitDao implements TuitDaoI {
    private static tuitDao: TuitDao | null = null;
    public static getInstance = (): TuitDao => {
        if (TuitDao.tuitDao === null) {
            TuitDao.tuitDao = new TuitDao();
        }
        return TuitDao.tuitDao;
    }

    private constructor() {
    }

    findAllTuits = async (): Promise<Tuit[]> =>
        TuitModel.find()
            .populate("postedBy")
            .exec();
    findAllTuitsByUser = async (uid: string): Promise<Tuit[]> =>
        TuitModel.find({postedBy: uid})
            .populate("postedBy")
            .exec();
    findTuitById = async (tid: string): Promise<any> =>
        TuitModel.findById(tid)
            .populate("postedBy")
            .exec();
    createTuitByUser = async (uid: string, tuit: Tuit): Promise<Tuit> =>
        TuitModel.create({...tuit, postedBy: uid});
    updateTuit = async (uid: string, tuit: Tuit): Promise<any> =>
        TuitModel.updateOne(
            {_id: uid},
            {$set: tuit});
    deleteTuit = async (tid: string): Promise<any> =>
        TuitModel.deleteOne({_id: tid}).then(() =>
            BookmarkModel.findOneAndDelete({bookmarkedTuit: tid}).then((b) =>
                b && TagAssociationModel.deleteMany({bookmark: b._id})));
    updateTuitStats = async (tid: string, newStats: any) =>
        TuitModel.updateOne({_id: tid}, {$set: {stats: newStats}})
}
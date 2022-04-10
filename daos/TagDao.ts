import TagDaoI from "../interfaces/TagDaoI";
import Tag from "../models/Tag";
import TagModel from "../mongoose/tags/TagModel";

/**
 * @file Implements DAO managing data storage of tags. Uses mongoose TagModel to integrate with MongoDB
 */
export default class TagDao implements TagDaoI {
    private static tagDao: TagDao | null = null;
    public static getInstance = (): TagDao => {
        if (TagDao.tagDao === null) {
            TagDao.tagDao = new TagDao();
        }
        return TagDao.tagDao;
    }

    private constructor() {
    }

    createTag = async (tagName: string): Promise<Tag | null> =>
        TagModel.findOneAndUpdate({tagName: tagName}, {tagName: tagName}, {upsert: true, new: true});

    deleteTag = async (tagName: string): Promise<any> =>
        TagModel.deleteOne({tagName: tagName});

    getTag = async (tagName: string): Promise<Tag | null> =>
        TagModel.findOne({tagName: tagName});
}
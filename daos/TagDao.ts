import TagDaoI from "../interfaces/TagDaoI";
import Tag from "../models/Tag";
import TagModel from "../mongoose/tags/tagModel";
/**
 * @file Implements DAO managing data storage of tags. Uses mongoose TagModel to integrate with MongoDB
 */
export default class TagDao implements TagDaoI{
    private static tagDao: TagDao | null = null;
    public static getInstance = (): TagDao =>{
        if(TagDao.tagDao === null){
            TagDao.tagDao = new TagDao();
        }
        return TagDao.tagDao;
    }

    private constructor() {
    }

    createTagByUser = async (uid: string, tag: Tag): Promise<Tag> =>
        TagModel.create({...tag, postedBy: uid});

    deleteTag = async (tagId: string ): Promise<any> =>
        TagModel.deleteOne({_id: tagId});

    findAllTags = async (): Promise<Tag[]> =>
        TagModel.find()
            .exec();


    findAllTagsByUser = async (uid: string): Promise<Tag[]> =>
        TagModel.find({postedBy: uid})
            .exec();
}
import Tag from "../models/Tag";

/**
 * @file Declares API for Tag related data access object methods
 */
export default interface TagDaoI{
    findAllTagsByUser(uid: string): Promise<Tag[]>;
    findAllTags():Promise<Tag[]>;
    createTagByUser(uid:string, tag: Tag): Promise<Tag>;
    deleteTag(tagId: string): Promise<any>;
}
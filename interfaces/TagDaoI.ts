import Tag from "../models/Tag";

/**
 * @file Declares API for Tag related data access object methods
 */
export default interface TagDaoI {
    createTag(tagName: String): Promise<Tag | null>;

    deleteTag(tagName: String): Promise<any>;

    getTag(tagName: String): Promise<Tag | null>;
}
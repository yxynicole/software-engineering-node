import TagAssociation from "../models/TagAssociation";
import Bookmark from "../models/Bookmark";
import Tag from "../models/Tag";
/**
 * TagAssociationDaoI Interface
 */
export default interface TagAssociationDaoI{
    /**
     * Create a TagAssociation for the bookmark and the tag
     * @param{string} tagId The tag id represents the tag attached to the bookmark
     * @param{string} bookmarkId The bookmark id represents the bookmark that has been tagged
     */
    createTagAssociation(tagId: string, bookmarkId: string):Promise<TagAssociation>;

    /**
     * Delete a TagAssociation
     * @param {string} tagId The tagId represents the tag of the tagAssociation to be deleted
     * @param {string} bookmarkId The bookmarkId represents the bookmark of the tagAssociation to be deleted
     */
    deleteTagAssociation(tagId: string, bookmarkId: string):Promise<any>;

    /**
     * Find all tagAssociations tagged by the user
     * @param {string} tagId The tag id to query for bookmarks
     * @returns {Bookmark[]} Bookmarks array
     */
    findBookmarksByTag(tagId: string): Promise<TagAssociation[]>;

}
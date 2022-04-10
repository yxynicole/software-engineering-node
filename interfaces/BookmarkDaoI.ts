import Bookmark from "../models/Bookmark";
import TagAssociation from "../models/TagAssociation";
/**
 * BookmarkDaoI Interface
 *
 * @interface
 */
export default interface BookmarkDaoI{
    /**
     * Create a bookmark for the tuit that was bookmarked by the user
     * @param{string} uid The user id represents the user who liked the tuit
     * @param{string} tid The tuit id represents the tuit that was liked by the user
     * @returns {Bookmark} The bookmark
     */
    createBookmark(uid: string, tid: string): Promise<Bookmark>;

    /**
     * Delete a bookmark of the tuit that was bookmarked by the user
     * @param {string} uid The user id represents the user who liked the tuit
     * @param {string} tid The tuit id represents the tuit that was liked by the use
     */
    deleteBookmark(uid: string, tid: string): Promise<any>;

    /**
     * Find all bookmarks liked by the user
     * @param {string}uid The user id represents the user who bookmarked the tuit
     * @returns {Bookmarks[]} Bookmarks array
     */
    findBookmarksByUser(uid: string): Promise<Bookmark[]>;

    /**
     * Return true if the tuit is bookmarked otherwise return false
     * @param{string} uid The user id represents the user who liked the tuit
     * @param{string} tid Tuiter id
     * @returns {Bookmark} Bookmarks array
     */
    findBookmarkByTuit(uid: string, tid: string): Promise<Bookmark | null>;

    getOrCreateBookmarkByTuit(uid: string, tid: string): Promise<Bookmark>
}
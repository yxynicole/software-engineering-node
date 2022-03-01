import Like from "../models/Like";
/**
 * LikeDaoI Interface
 *
 * @interface
 */
export default interface LikeDaoI {
    /**
     * Create a like for the tuit that was liked by the user
     * @param {string} uid The user id represents the user who liked the tuit
     * @param {string} tid The tuit id represents the tuit that was liked by the user
     * @returns {Like} The like
     */
    createLike(uid: string, tid: string): Promise<Like>;

    /**
     * Delete a like of the tuit that was liked by the user
     * @param {string} uid The user id who liked the tuit
     * @param {string} tid The tuit id that was liked by the user
     * @returns {any} The result of the deletion
     */
    deleteLike(uid: string, tid: string): Promise<any>;

    /**
     * Find all likes liked by the user
     * @param {User} uid The user id who liked the tuit
     * @returns {Likes} Likes array
     */
    findLikesByUser(uid: string): Promise<Like[]>;

    /**
     * Find all likes related to the tuit
     * @param {string} tid The tuit id with likes
     * @returns {Likes} Likes array
     */
    findLikesByTuit(tid: string): Promise<Like[]>;
}
import Like from "../models/Like";

/**
 * Interface for class Like that represents a Like
 *
 * @interface
 */
export default interface LikeDaoI {
    /**
     * Create a like for the tuit that was liked by the user
     * @param {string} uid The user id who liked the tuit
     * @param {string} tid The tuit id that was liked by the user
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
     * @returns {Likes} The result of find
     */
    findLikesByUser(uid: string): Promise<Like[]>;

    /**
     * Find all likes related to the tuit
     * @param {string} tid The tuit id with likes
     * @returns {Likes} The result of find
     */
    findLikesByTuit(tid: string): Promise<Like[]>;
}
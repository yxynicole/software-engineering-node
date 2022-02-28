import Follow from "../models/Follow";

/**
 *  Interface for class Following that represents a follow relation
 *
 * @interface
 */
export default interface FollowDaoI {
    /**
     * Create a follow relation for the follower and followee, both are users.
     * @param {string} followerId The follower id represents the follower
     * @param {string} followeeId The followee id represents the followee
     * @returns {Follow} The follow object
     */
    createFollow(followerId: string, followeeId: string): Promise<Follow>;

    /**
     * Delete a follow relation for the follower and followee.
     * @param {string} followerId The follower id represents the follower
     * @param {string} followeeId the folowee id represents the followee
     */
    deleteFollow(followerId: string, followeeId: string): Promise<any>;

    /**
     * Retrieve all follow objects representing relations that are attached to the follower(user)
     * @param {string} uid The uid identifies the user
     * @returns {follow[]} An array of follow object
     */
    findFollowsbyFollower(uid: string): Promise<Follow[]>;

    /**
     * Retrieve all follow objects representing relations that are attached to the followee(user)
     * @param {string} uid The uid identifies the user
     * @returns {follow[]} An array of follow object
     */
    findFollowsbyFollowee(uid: string): Promise<Follow[]>;
}
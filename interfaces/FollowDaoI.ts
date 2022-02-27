import Follow from "../models/Follow";
import User from "../models/User";

/**
 * Interface for class Follow that represents a follow
 *
 * @interface
 */
export default interface FollowDaoI {
    /**
     * Create a follow relation for the follower and followee, both are users.
     * @param {string} followerId The follower id represents the follower
     * @param {string} followeeId The followee id represents the followee
     * @returns {Follow} The follow relation
     */
    createFollow(followerId: string, followeeId: string): Promise<Follow>;

    /**
     * Delete a follow relation for the follower and followee.
     * @param {string} followerId The follower id represents the follower
     * @param {string} followeeId the folowee id represents the followee
     */
    deleteFollow(followerId: string, followeeId: string): Promise<any>;

    /**
     * Retrive all followees who have been followed by the user(follower)
     * @param {string} uid The uid identifies the user
     * @returns {User[]} followees An array of followees
     */
    findFollowsbyFollower(uid: string): Promise<Follow[]>;

    /**
     * Retrive all followers who have followed the user(followee)
     * @param {string} uid The uid identifies the user
     * @returns {User[]} followers An array of followers who have followed the user
     */
    findFollowsbyFollowee(uid: string): Promise<Follow[]>;

}
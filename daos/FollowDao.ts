import FollowDaoI from "../interfaces/FollowDaoI";
import Follow from "../models/Follow";
import FollowModel from "../mongoose/FollowModel";
import User from "../models/User";
import {ObjectId} from "mongodb";

export default class FollowDao implements FollowDaoI{
    async createFollow(followerId: string, followeeId: string): Promise<Follow> {
        return FollowModel.create({
            follower: followerId,
            followee: followeeId,
        });
    }

    async deleteFollow(followerId: string, followeeId: string): Promise<any> {
        return FollowModel.deleteOne({
            follower:followerId,
            follwee:followeeId,
        });
    }

    /**
     *
     * @param uid
     *
     * Follow{
     *      id: 001
     *     follower: user0001
     *     followee: user0003
     * }
     *after populate
     * Follow{
     *      id: 002
     *     follower: user0001
     *     followee: {username:emma, password: sfsfdf, firstName:emma, ...}
     * }
     */
    async findFollowsbyFollower(uid: string): Promise<Follow[]> {
        return FollowModel.find({
            follower: new ObjectId(uid)
        }).populate('followee');
    }

    async findFollowsbyFollowee(uid: string): Promise<Follow[]> {
        return FollowModel.find({
            followee:new ObjectId(uid)
        }).populate('follower');
    }
}
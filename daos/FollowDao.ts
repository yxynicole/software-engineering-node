import FollowDaoI from "../interfaces/FollowDaoI";
import Follow from "../models/Follow";
import FollowModel from "../mongoose/FollowModel";
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
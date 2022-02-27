import mongoose, {Schema} from "mongoose";
import Follow from "../models/Follow";
/**
 * @typedef follow Represents a follow relation between two users
 * @property {User} follower follower is the one who follows
 * @property {User} followee followee is the one who is followed
 */
const FollowSchema = new mongoose.Schema<Follow>({
    follower: {type: Schema.Types.ObjectId, ref: 'UserModel'},
    followee: {type: Schema.Types.ObjectId, ref: 'UserModel'}
}, {collection:'follow'});
export default FollowSchema;
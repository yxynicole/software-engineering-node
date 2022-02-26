import mongoose, {Schema} from "mongoose";

/**
 * @typedef Like Represents a like relation between a Tuit and an User
 * @property {Tuit} tuit Liked tuit
 * @property {User} likedBy User who liked the tuit
 */
const LikeSchema = new mongoose.Schema({
    tuit: {type: Schema.Types.ObjectId, ref: 'TuitModel'},
    likedBy: {type: Schema.Types.ObjectId, ref: 'UserModel'}
}, {collection:'likes'});
export default LikeSchema;
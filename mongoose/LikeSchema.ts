import mongoose, {Schema} from "mongoose";
import Like from "../models/Like";
/**
 * @typedef Like Represents a like relation between a tuit and an user: the user liked the tuit.
 * @property {Tuit} tuit Liked tuit
 * @property {User} likedBy User who liked the tuit
 */
const LikeSchema = new mongoose.Schema<Like>({
    tuit: {type: Schema.Types.ObjectId, ref: 'TuitModel'},
    likedBy: {type: Schema.Types.ObjectId, ref: 'UserModel'}
}, {collection:'likes'});
export default LikeSchema;
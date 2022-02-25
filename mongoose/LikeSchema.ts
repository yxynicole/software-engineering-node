import mongoose, {Schema} from "mongoose";

const LikeSchema = new mongoose.Schema({
    tuit: [{type: Schema.Types.ObjectId, ref: 'Tuit'}],
    likedBy: [{type: Schema.Types.ObjectId, ref: 'User'}]
}, {collection:'likes'});
export default LikeSchema;
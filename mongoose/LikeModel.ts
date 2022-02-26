import mongoose from "mongoose";
import LikeSchema from "./LikeSchema";

/**
 * moogoose model for LikeSchema
 */
const LikeModel= mongoose.model('LikeModel', LikeSchema);
export default LikeModel;
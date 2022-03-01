import mongoose from "mongoose";
import LikeSchema from "./LikeSchema";

/**
 * moogoose LikeModel based on  LikeSchema
 */
const LikeModel= mongoose.model('LikeModel', LikeSchema);
export default LikeModel;
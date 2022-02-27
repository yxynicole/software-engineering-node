import mongoose from "mongoose";
import FollowSchema from "./FollowSchema";

/**
 * mongoose FollowModel based on FollowSchema
 */
const FollowModel = mongoose.model('followModel', FollowSchema);
export default FollowModel;
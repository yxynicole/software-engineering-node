import mongoose from "mongoose";
import FollowSchema from "./FollowSchema";
/**
 * mongoose FollowModel based on FollowSchema
 */
const FollowModel = mongoose.model('FollowModel', FollowSchema);
export default FollowModel;
import mongoose from "mongoose";
import TagSchema from "./TagSchema";

/**
 * mongoose TagModel based on TagSchema
 */
const TagModel = mongoose.model('TagModel', TagSchema);
export default TagModel;
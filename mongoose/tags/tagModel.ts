import mongoose from "mongoose";
import TagSchema from "./TagSchema";

/**
 * mongoose TagModel based on TagSchema
 */
const TagModel = mongoose.model('tagModel', TagSchema);
export default TagModel;
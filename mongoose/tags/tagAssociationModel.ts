import mongoose from "mongoose";
import TagAssociationSchema from "./TagAssociationSchema";

/**
 * mongoose TagAssoicationModel based on TagAssociationSchema
 */
const TagAssociationModel = mongoose.model('TagAssociationModel', TagAssociationSchema);
export default TagAssociationModel;
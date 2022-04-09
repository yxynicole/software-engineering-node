import mongoose from "mongoose";
import tagAssociationSchema from "./tagAssociationSchema";

/**
 * mongoose TagAssoicationModel based on TagAssociationSchema
 */
const TagAssociationModel = mongoose.model('tagAssociationModel', tagAssociationSchema);
export default TagAssociationModel;
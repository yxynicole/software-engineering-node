import tagAssociation from "../../models/tagAssociation"
import {Schema} from "mongoose";

const TagAssociationSchema = new Schema<tagAssociation>({
    tag:{type: Schema.Types.ObjectId, ref:'TagModel'},
    bookmark:{type: Schema.Types.ObjectId, ref:'BookmarkModel'},
},{collection:'TagAssociation'});
export default TagAssociationSchema;
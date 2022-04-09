import mongoose, {Schema} from "mongoose";
import TagAssociation from "../../models/TagAssociation"

const TagAssociationSchema = new mongoose.Schema<TagAssociation>({
    tag: {type: Schema.Types.ObjectId, ref: 'TagModel'},
    bookmark: {type: Schema.Types.ObjectId, ref: 'BookmarkModel'},
}, {collection: 'tag_associations'});
export default TagAssociationSchema;
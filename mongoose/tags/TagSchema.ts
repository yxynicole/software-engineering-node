import mongoose,{Schema} from 'mongoose';
import Tag from "../../models/Tag";

/**
 * @typedef Tag An object represents a tag
 * @property {string} tagName The name of the tag
 */
const TagSchema = new Schema<Tag>({
    tagName:{type: String, required: true},
},{collection:'tags'});
export default TagSchema;
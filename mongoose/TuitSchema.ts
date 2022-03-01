import mongoose, {Schema} from "mongoose";
/**
 * @typedef Tuit An tuit object
 * @property {tuit} string content of the tuit object
 * @property {postedOn} Date The date of posting the tuit
 * @property {postedBy} User The user who posted the tuit
 */
const TuitSchema = new mongoose.Schema({
    tuit: String,
    postedOn: Date,
    postedBy: {type: Schema.Types.ObjectId, ref: 'UserModel'}
}, {collection: 'tuits'});
export default TuitSchema;
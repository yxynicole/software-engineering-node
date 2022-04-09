import mongoose,{Schema}  from 'mongoose';
import Bookmark from "../../models/Bookmark";
/**
 * @typedef Bookmark An object represents the bookmarking relation between the tuit and the user: the tuit has been bookmarked by the user.
 * @property {bookmarkedTuit} Tuit Bookmarked tuit
 * @property {bookmarkedBy} User User who bookmarked the tuit
 */
const BookmarkSchema = new mongoose.Schema<Bookmark>({
    bookmarkedTuit: {type: Schema.Types.ObjectId, ref: 'TuitModel'},
    bookmarkedBy:{type: Schema.Types.ObjectId, ref: 'UserModel'}
},{collection:'bookmarks'});
export default BookmarkSchema;
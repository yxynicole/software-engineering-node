import mongoose,{Schema}  from 'mongoose';
import Bookmark from "../models/Bookmark";
/**
 * @typedef Bookmark A object represents that the tuit has been bookmarked by the user
 * @property {bookmarkedTuit} Tuit Bookmarked tuit
 * @property {bookmarkedBy} User User who bookmarked the tuit
 */
const BookmarkSchema = new Schema<Bookmark>({
    bookmarkedTuit: {type: Schema.Types.ObjectId, ref: 'TuitModel'},
    bookmarkedBy:{type: Schema.Types.ObjectId, ref: 'UserModel'}
},{collection:'bookmarks'});
export default BookmarkSchema;
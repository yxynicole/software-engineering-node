import mongoose from "mongoose";
import BookmarkSchema from "./BookmarkSchema";

/**
 * mongoose BookmarkModel based on BookmarkSchema
 */
const BookmarkModel = mongoose.model('followModel', BookmarkSchema);
export default BookmarkModel;
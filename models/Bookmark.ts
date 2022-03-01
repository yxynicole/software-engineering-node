import Tuit from "./Tuit"
import User from "./User"

/**
 * Bookmark representing a bookmark
 * @property {Tuit} bookmarkedTuit refers to the bookmarked tuit
 * @property {User} bookmarkedBy refers to the user who bookmarked the tuit
 */
export default class Bookmark{
    public bookmarkedTuit: Tuit | null = null;
    public bookmarkedBy: User | null = null;
}
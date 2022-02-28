import Tuit from "./Tuit"
import User from "./User"

/**
 * Bookmark represents a bookmark
 *
 */
export default class Bookmark{
    public bookmarkedTuit: Tuit | null = null;
    public bookmarkedBy: User | null = null;
}
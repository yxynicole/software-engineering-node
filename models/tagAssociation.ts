import Tag from "./Tag"
import Bookmark from "./Bookmark";
import User from "./users/User";

/**
 * TagAssociation representing a relation between a bookmark and a tag.
 * @property {string} tagName refers to the name of the tag
 */
export default class TagAssociation {
    public tag: Tag | null = null;
    public bookmark: Bookmark | null = null;
    public taggedBy: User | null = null;
}
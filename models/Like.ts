import User from "./User";
import Tuit from "./Tuit";
/**
 * @class Like represents a like relation between the user who liked the tuit
 * @property {Tuit} tuit refers to the liked tuit
 * @property {User} likedBy refers to the user who liked the tuit
 */
export default class Like {
    tuit: Tuit | null = null;
    likedBy: User | null = null;
}
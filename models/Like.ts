import User from "./User";
import Tuit from "./Tuit";

export default class Like {
    tuit: Tuit | null = null;
    likedBy: User | null = null;
}
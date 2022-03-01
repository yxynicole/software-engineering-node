import User from "./User";
/**
 * Tuit representing a tuit
 * @property {string} tuit content of the tuit
 * @property {Date} postedOn  posting date
 * @property {User} postedBy the user who posted the tuit
 */
export default class Tuit {
    private tuit: string = '';
    private postedOn: Date = new Date();
    private postedBy: User | null = null;
}

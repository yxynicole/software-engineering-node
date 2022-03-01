import User from "./User";

/**
 * @class follow represents a follow relation between two users
 * @property {User} follower follower is the one who follows
 * @property {User} followee followee is the one who is followed
 */
export default class Follow{
    follower: User | null = null;
    followee: User | null = null;
}
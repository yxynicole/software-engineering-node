import User from "./User";
/**
 * Message representing a message
 * @property {User} from message sender
 * @property {User} to message receiver
 * @property {string} message content of the message
 * @property {Date} sentOn date on the message
 */
export default class Massage{
    public from : User | null = null;
    public to : User | null = null;
    public message: string | null = null;
    public sentOn: Date = new Date();
}
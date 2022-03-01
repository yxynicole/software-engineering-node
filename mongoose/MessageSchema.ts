import mongoose, {Schema} from "mongoose";
import Message from "../models/Message";

/**
 * @typedef Message An message object
 * @property {from} User The user who sent message.
 * @property {to} User The user who received the message.
 * @property {sentOn} Date The date of creating the message.
 */
const MessageSchema = new mongoose.Schema<Message>({
    from:{type: Schema.Types.ObjectId, ref: 'UserModel'},
    to: {type: Schema.Types.ObjectId, ref: 'UserModel'},
    message: {type: String, required:true},
    sentOn: {type: Date, default: Date.now},
},{collection:'messages'});
export default MessageSchema;
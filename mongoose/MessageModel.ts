import mongoose from "mongoose";
import MessageSchema from "./MessageSchema";

/**
 * mongoose MessageModel based on MessageSchema
 */
const MessageModel = mongoose.model('messageModel', MessageSchema);
export default MessageModel;
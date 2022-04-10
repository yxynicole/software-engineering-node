import mongoose from "mongoose";
import MessageSchema from "./MessageSchema";

/**
 * mongoose MessageModel based on MessageSchema
 */
const MessageModel = mongoose.model('MessageModel', MessageSchema);
export default MessageModel;
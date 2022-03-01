import Message from "../models/Message"
/**
 * MessageDaoI Interface
 *
 * @interface
 */
export default interface MessageDaoI{
    createMessage(senderId: string, message: string, receiverId: string): Promise<Message>
    deleteMessage(senderId: string, mid: string): Promise<any>
    findMessagesByReceiver(receiverId: string ): Promise<Message[]>
    findMessageBySender(senderId: string): Promise<Message[]>
}
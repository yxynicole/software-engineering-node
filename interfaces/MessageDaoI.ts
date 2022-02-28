import Message from "../models/Message"
export default interface MessageDaoI{
    createMessage(senderId: string, message: string, receiverId: string): Promise<Message>
    deleteMessage(senderId: string, message: string, receiverId: string): Promise<any>
    findMessagesByReceiver(receiverId: string ): Promise<Message[]>
    findMessageBySender(senderId: string): Promise<Message[]>
}
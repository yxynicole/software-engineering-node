import MessageDaoI from "../interfaces/MessageDaoI";
import Massage from "../models/Message";
import MessageModel from "../mongoose/MessageModel";
import {ObjectId} from "mongodb";

export default class MessageDao implements MessageDaoI{
    async createMessage(uid: string, message: string, receiverId: string): Promise<Massage> {
        return MessageModel.create({
            from: uid,
            to: receiverId,
            message: message,
        });
    }

    async deleteMessage(uid: string, message: string, receiverId: string): Promise<any> {
        return MessageModel.deleteOne({
            from: uid,
            to: receiverId,
            message: message,
        });
    }

    async findMessageBySender(senderId: string): Promise<Massage[]> {
        return MessageModel.find({
            from: new ObjectId(senderId),
        }).populate('message').populate('sentOn')
    }

    async findMessagesByReceiver(receiverId: string): Promise<Massage[]> {
        return MessageModel.find({
            from: new ObjectId(receiverId),
        }).populate('message').populate('sentOn')
    }
}
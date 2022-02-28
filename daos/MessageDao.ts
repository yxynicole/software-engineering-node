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

    async deleteMessage(uid: string, mid: string): Promise<any> {
        return MessageModel.deleteOne({
            from: new ObjectId(uid),
            _id: new ObjectId(mid),
        });
    }

    async findMessageBySender(senderId: string): Promise<Massage[]> {
        return MessageModel.find({
            from: new ObjectId(senderId),
        })
    }

    async findMessagesByReceiver(receiverId: string): Promise<Massage[]> {
        return MessageModel.find({
            to: new ObjectId(receiverId),
        })
    }
}
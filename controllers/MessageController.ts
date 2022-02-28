import {Request, Response, Express} from "express";
import MessageControllerI from "../interfaces/MessageControllerI";

export default class MessageController implements MessageControllerI{
    messageDao: MessageDao

    constructor(){
        this.messageDao = new MessageDao()
    }

    listen(app: Express){
        app.post('/users/:uid/messages', this.createMessage)
        app.delete('/users/:uid/messages', this.deleteMessage)
        app.get('/users/:uid/receivedMessages', this.findReceivedMessagesByUser)
        app.get('/users/:uid/sentMessages', this.findSentMessagesByUser)
    }

    createMessage = (req: Request, res: Response) => {
        let uid = req.params['uid'];
        let message = req.body.messageContent;
        let receiverId = req.body.receiverId;
        this.messageDao.createMessage(uid, message, receiverId)
    }

    deleteMessage = (req: Request, res: Response) => {
        let uid = req.params['uid'];
        let message = req.body.messageContent;
        let receiverId = req.body.receiverId;
        this.messageDao.deleteMessage(uid, message, receiverId)
    }

    findReceivedMessagesByUser = (req: Request, res: Response) => {
        let uid = req.params['uid']
        this.messageDao.findMessagesByReceiver(uid)
    }

    findSentMessagesByUser = (req: Request, res: Response) => {
        let uid = req.params['uid']
        this.messageDao.findMessageBySender(uid)
    }

}
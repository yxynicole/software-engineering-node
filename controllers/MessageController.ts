import {Request, Response, Express} from "express";
import MessageControllerI from "../interfaces/MessageControllerI";
import MessageDao from "../daos/MessageDao";
/**
 * Class representing a MessageController with MessageDao
 *
 * @class
 * @implements{MessageControllerI}
 */
export default class MessageController implements MessageControllerI {
    messageDao: MessageDao

    /**
     * Create a MessageDao object.
     */
    constructor() {
        this.messageDao = new MessageDao()
    }

    listen(app: Express) {
        app.post('/users/:uid/messages', this.createMessage)
        app.delete('/users/:uid/messages/:mid', this.deleteMessage)
        app.get('/users/:uid/receivedMessages', this.findReceivedMessagesByUser)
        app.get('/users/:uid/sentMessages', this.findSentMessagesByUser)
    }

    createMessage = (req: Request, res: Response) => {
        let uid = req.params['uid'];
        let message = req.body.messageContent;
        let receiverId = req.body.receiverId;
        this.messageDao.createMessage(uid, message, receiverId)
            .then(message => (res.json(message)))
            .catch(error => res.status(422).json(error));
    }

    findReceivedMessagesByUser = (req: Request, res: Response) => {
        let uid = req.params['uid']
        this.messageDao.findMessagesByReceiver(uid)
            .then(result => res.json(result))
            .catch(error => res.status(422).json(error));

    }

    findSentMessagesByUser = (req: Request, res: Response) => {
        let uid = req.params['uid']
        this.messageDao.findMessageBySender(uid)
            .then(result => res.json(result))
            .catch(error => res.status(422).json(error));
    }

    deleteMessage = (req: Request, res: Response) => {
        let uid = req.params['uid'];
        let mid = req.params.mid
        this.messageDao.deleteMessage(uid, mid)
            .then(result => res.json(result))
            .catch(error => res.status(422).json(error));
    }

}
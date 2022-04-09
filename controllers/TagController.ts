import {Request, Response, Express} from "express";
import TagControllerI from "../interfaces/TagControllerI";
import TagDao from "../daos/TagDao";
import Tag from "../models/Tag";

export default class TagController implements TagControllerI{
    private static tagDao: TagDao = TagDao.getInstance();
    private static tagController: TagController | null = null;

    public static getInstance = (app: Express): TagController =>{
        if(TagController.tagController === null){
            TagController.tagController = new TagController();
            app.get("/api/tags", TagController.tagController.findAllTags);
            app.get("/api/users/:uid/tags", TagController.tagController.findTagsByUser);
            app.post("/api/users/:uid/tags", TagController.tagController.createTag);
            app.delete("/api/tags/:tagId", TagController.tagController.deleteTag);
        }
        return TagController.tagController;
    }

    private constructor(){
    }

    findAllTags = (req: Request, res: Response) =>
        TagController.tagDao.findAllTags()
            .then((tags: Tag[]) =>{
                // console.log(tags);
                return res.json(tags)
            } )
            .catch(err => res.status(422).json(err));

    findTagsByUser = (req: Request, res: Response) => {
        //@ts-ignore
        let userId = req.params.uid === "me" && req.session['profile'] ? req.session['profile']._id : req.params.uid;

        return TagController.tagDao.findAllTagsByUser(userId)
            .then((tags:Tag[]) => res.json(tags))
            .catch(err => res.status(422).json(err));
    }

    createTag = (req: Request, res:Response) => {
        // @ts-ignore
        let userId = req.params.uid === "me" && req.session['profile'] ? req.session['profile']._id : req.params.uid
        if (userId === "me" || userId === "undefined" || userId === undefined) {
            res.status(403).send('not logged in')
            return;
        }

        TagController.tagDao.createTagByUser(userId, req.body)
            .then((tag: Tag) => res.json(tag))
            .catch(err => res.status(422).json(err));
    }

    deleteTag = (req:Request, res:Response) =>{
        TagController.tagDao.deleteTag(req.params.tagId)
            .then((status) => res.send(status))
            .catch(err => res.status(422).json(err));
    }

}
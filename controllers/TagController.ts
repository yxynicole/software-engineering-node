import {Request, Response, Express} from "express";
import TagControllerI from "../interfaces/TagControllerI";
import TagDao from "../daos/TagDao";
import Tag from "../models/Tag";
import TagAssociationDao from "../daos/TagAssociationDao";

export default class TagController {
    private static tagDao: TagDao = TagDao.getInstance();
    private static tagAssociationDao = new TagAssociationDao();
    private static tagController: TagController | null = null;

    public static getInstance = (app: Express): TagController => {
        if (TagController.tagController === null) {
            TagController.tagController = new TagController();
            // app.post("/api/users/:uid/tags", TagController.tagController.createTag);
            // app.delete("/api/tags/:tagId", TagController.tagController.deleteTag);
        }
        return TagController.tagController;
    }

    private constructor() {
    }


}
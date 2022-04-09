import {Request, Response, Express} from "express";
import TagAssociationDao from "../daos/TagAssociationDao";
import TagAssociationControllerI from "../interfaces/TagAssociationControllerI";

export default class TagAssociationController implements TagAssociationControllerI {
    tagAssociationDao: TagAssociationDao

    constructor() {
        this.tagAssociationDao = new TagAssociationDao();
    }

    listen(app: Express){
        app.post('/api/tags/:tagId/tagAssociations/bookmarks/:bookmarkId', this.createTagAssociation)
        app.delete('/api/tags/:tagId/tagAssociations/bookmarks/:bookmarkId', this.deleteTagAssociation)
        app.get('/api/tags/:tagId/tagsAssociations', this.findBookmarksByTag)
    }
    createTagAssociation = (req: Request, res: Response) => {
        let tagId = req.params['tagId']
        let bookmarkId = req.params['bookmarkId']
        this.tagAssociationDao.createTagAssociation(tagId, bookmarkId)
            .then(tagAssociation => res.json(tagAssociation))
            .catch(err => res.status(422).json(err))
    }

    deleteTagAssociation = (req: Request, res: Response) => {
        let tagId = req.params['tagId']
        let bookmarkId = req.params['bookmarkId']
        this.tagAssociationDao.deleteTagAssociation(tagId, bookmarkId)
            .then(result => res.json(result))
            .catch(err => res.status(422).json(err))
    }

    findBookmarksByTag = (req: Request, res: Response) => {
        let tagId= req.params['tagId']
        this.tagAssociationDao.findBookmarksByTag(tagId)
            .then(tagAssociations => {
                // console.log(tagAssociations)
                return res.json(tagAssociations.map(tagAssociation=>tagAssociation.bookmark?.bookmarkedTuit))
            })
            .catch(err =>{
                console.log(err);
                return res.status(422).json(err)
            })
    }


}
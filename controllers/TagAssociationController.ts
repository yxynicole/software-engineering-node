import {Request, Response, Express} from "express";
import TagAssociationDao from "../daos/TagAssociationDao";
import TagAssociationControllerI from "../interfaces/TagAssociationControllerI";
import TagDao from "../daos/TagDao";
import BookmarkDao from "../daos/BookmarkDao";

export default class TagAssociationController implements TagAssociationControllerI {
    tagAssociationDao: TagAssociationDao
    tagDao: TagDao;
    bookmarkDao: BookmarkDao;

    constructor() {
        this.tagAssociationDao = new TagAssociationDao();
        this.tagDao = TagDao.getInstance();
        this.bookmarkDao = new BookmarkDao();
    }

    listen(app: Express) {
        app.post('/api/users/:uid/bookmarks/:tid/tags', this.createTagAssociation)
        app.delete('/api/users/:uid/bookmarks/:tid/tags', this.deleteTagAssociation)
        app.get('/api/users/:uid/bookmarks/:tid/tags', this.findTagsByBookmark)
        app.get('/api/users/:uid/tags', this.findTagsByUser)
    }

    createTagAssociation = async (req: Request, res: Response) => {
        if (!this.validate(req)) {
            return res.status(403).send("unauthorized")
        }
        const tagName = req.body.tagName
        const tag = await this.tagDao.createTag(tagName)
        const bookmark = await this.bookmarkDao.getOrCreateBookmarkByTuit(req.params['uid'], req.params['tid']);
        // @ts-ignore
        const bid = bookmark._id;
        // @ts-ignore
        this.tagAssociationDao.createTagAssociation(req.params['uid'], tag._id, bid)
            .then(tagAssociation => res.json(tagAssociation))
            .catch(err => res.status(422).json(err))
    }

    deleteTagAssociation = async (req: Request, res: Response) => {
        if (!this.validate(req)) {
            return res.status(403).send("unauthorized")
        }
        const tagName = req.body.tagName
        // @ts-ignore
        const tag = await this.tagDao.createTag(tagName)
        const bookmark = await this.bookmarkDao.getOrCreateBookmarkByTuit(req.params['uid'], req.params['tid']);

        // @ts-ignore
        const bid = bookmark._id;
        // @ts-ignore
        this.tagAssociationDao.deleteTagAssociation(tag._id, bid)
            .then(result => res.json(result))
            .catch(err => res.status(422).json(err))
    }

    findTagsByBookmark = async (req: Request, res: Response) => {
        if (!this.validate(req)) {
            return res.status(403).send("unauthorized")
        }
        const bookmark = await this.bookmarkDao.findBookmarkByTuit(req.params['uid'], req.params['tid']);
        if (!bookmark) {
            return res.json([])
        }
        // @ts-ignore
        const bid = bookmark._id;
        this.tagAssociationDao.findAllTagsByBookmark(bid)
            .then(tagAssociations => {
                return res.json(tagAssociations.map(t => t.tag))
            })
            .catch(err => {
                return res.status(422).json(err)
            })
    }

    findTagsByUser = async (req: Request, res: Response) => {
        if (!this.validate(req)) {
            return res.status(403).send("unauthorized")
        }
        this.tagAssociationDao.findTagAssociationByUser(req.params.uid)
            .then(data => res.json(data))
            .catch(err => res.status(422).json(err))
    }

    private validate(req: Request) {
        // @ts-ignore
        const profile = req.session['profile'];
        if (!profile) {
            return false
        }
        if (req.params.uid === "me" && profile) {
            req.params.uid = profile._id
        }
        return true
    }
}
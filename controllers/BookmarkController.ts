import {Request, Response, Express} from "express";
import bookmarkControllerI from "../interfaces/BookmarkControllerI";
import BookmarkDao from "../daos/BookmarkDao";
import TuitDao from "../daos/TuitDao";
import TagAssociationDao from "../daos/TagAssociationDao";

/**
 * Class representing a BookmarkController with BookmarkDao
 *
 * @class
 * @implements{bookmarkControllerI}
 */
export default class BookmarkController implements bookmarkControllerI {
    bookmarkDao: BookmarkDao
    tagAssociationDao: TagAssociationDao
    tuitDao: TuitDao

    /**
     * Create a BookmarkDao object.
     */
    constructor() {
        this.bookmarkDao = new BookmarkDao()
        this.tuitDao = TuitDao.getInstance();
        this.tagAssociationDao = new TagAssociationDao()
    }

    /**
     * BookmarkController listens on the app
     * @param {Express} app Express server application.
     */
    listen(app: Express) {
        // app.post('/api/users/:uid/bookmarks/:tid', this.createBookmark)
        // app.delete('/api/users/:uid/bookmarks/:tid', this.deleteBookmark)
        app.get('/api/users/:uid/bookmarks', this.findBookmarksByUser)
        app.put('/api/users/:uid/bookmarks/:tid', this.toggleBookmark)
    }

    /**
     * Create a bookmark object that represents the bookmarking relationship between the bookmarked tuit and the user who bookmarked it.
     * @param req {Request} The request contains the user id and the tuit id. They identify two entities respectively.
     * @param res {Response} The response contains the newly created bookmark object
     */
    createBookmark = (req: Request, res: Response) => {
        let uid = req.params['uid']
        let tid = req.params['tid']
        this.bookmarkDao.createBookmark(uid, tid)
            .then(bookmark => res.json(bookmark))
            .catch(err => res.status(422).json(err))
    }

    /**
     * Delete a bookmark object that represents the bookmarking relationship between the bookmarked tuit and the user who bookmarked it.
     * @param req {Request} The request contains the user id and the tuit id. They identify two entities respectively.
     * @param res {Response} The response contains either deletion count or  failure code
     */
    deleteBookmark = (req: Request, res: Response) => {
        let uid = req.params['uid']
        let tid = req.params['tid']
        this.bookmarkDao.deleteBookmark(uid, tid)
            .then(result => res.json(result))
            .catch(err => res.status(422).json(err))
    }

    /**
     * Retrieve all bookmarks bookmarked by the user
     * @param req {Request} The request contains the user id
     * @param res {Response} The response contains all bookmarks bookmarked by the user
     */
    findBookmarksByUser = (req: Request, res: Response) => {
        const uid = req.params['uid'];
        // @ts-ignore
        const profile = req.session['profile'];
        const userId = uid === "me" && profile ?
            profile._id : uid;
        if (!profile || userId !== profile._id) {
            res.status(403)
            return
        }
        this.bookmarkDao.findBookmarksByUser(userId)
            .then(bookmarks => {
                res.json(bookmarks.map(bookmark => bookmark.bookmarkedTuit))
            })
            .catch(err => {
                return res.status(422).json(err)
            })
    }
    toggleBookmark = async (req: Request, res: Response) => {
        const uid = req.params.uid;
        const tid = req.params.tid;
        // @ts-ignore
        const profile = req.session['profile'];
        const userId = uid === "me" && profile ? profile._id : uid;
        try {
            const bookmark = await this.bookmarkDao.findBookmarkByTuit(userId, tid);
            const tuit = await this.tuitDao.findTuitById(tid);
            // @ts-ignore
            if (bookmark) {
                await this.bookmarkDao.deleteBookmark(userId, tid);
                tuit.stats.bookmarked = false;
            } else {
                await this.bookmarkDao.createBookmark(userId, tid);
                tuit.stats.bookmarked = true;
            }
            await this.tuitDao.updateTuitStats(tid, tuit.stats);
            res.sendStatus(200);
        } catch (e) {
            res.status(500).json(e);
        }
    }
}
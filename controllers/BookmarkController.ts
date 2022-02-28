import {Request, Response, Express} from "express";
import bookmarkControllerI from "../interfaces/BookmarkControllerI";
import BookmarkDao from "../daos/BookmarkDao";

/**
 * BookmarkController cooperates with BookmarkDao to provide services to clients.
 */
export default  class BookmarkController implements  bookmarkControllerI{
    bookmarkDao: BookmarkDao

    constructor (){
        this.bookmarkDao = new BookmarkDao()
    }

    listen(app: Express){
        app.post('/users/:uid/bookmarks/:tid', this.createBookmark)
        app.delete('/users/:uid/bookmarks/:tid', this.deleteBookmark)
        app.get('/users/:uid/bookmarks', this.findBookmarksByUser)
    }

    createBookmark = (req: Request, res: Response) => {
        let uid = req.params['uid']
        let tid = req.params['tid']
        this.bookmarkDao.createBookmark(uid, tid)
            .then(bookmark => res.json(bookmark))
            .catch(err => res.status(422).json(err))
    }

    deleteBookmark = (req: Request, res: Response) => {
        let uid = req.params['uid']
        let tid = req.params['tid']
        this.bookmarkDao.deleteBookmark(uid, tid)
            .then(result => res.json(result))
            .catch(err => res.status(422).json(err))
    }

    findBookmarksByUser = (req: Request, res: Response) => {
        let uid = req.params['uid']
        this.bookmarkDao.findBookmarksByUser(uid)
            .then(bookmarks => res.json(bookmarks.map(bookmark => bookmark.bookmarkedTuit)))
            .catch(err => res.status(422).json(err))
    }
}
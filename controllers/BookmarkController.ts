import {Request, Response, Express} from "express";
import bookmarkControllerI from "../interfaces/BookmarkControllerI";
import BookmarkDao from "../daos/BookmarkDao";
/**
 * Class representing a BookmarkController with BookmarkDao
 *
 * @class
 * @implements{bookmarkControllerI}
 */
export default  class BookmarkController implements  bookmarkControllerI{
    bookmarkDao: BookmarkDao

    /**
     * Create a BookmarkDao object.
     */
    constructor (){
        this.bookmarkDao = new BookmarkDao()
    }

    /**
     * BookmarkController listens on the app
     * @param {Express} app Express server application.
     */
    listen(app: Express){
        app.post('/users/:uid/bookmarks/:tid', this.createBookmark)
        app.delete('/users/:uid/bookmarks/:tid', this.deleteBookmark)
        app.get('/users/:uid/bookmarks', this.findBookmarksByUser)
    }

    /**
     * Create a bookmark object that represents the bookmarking relationship between the bookmarked tuit and the user who bookmarked it.
     * @param req {Request} The request contains the user id and the tuit id. They identify two entities respectively.
     * @param res {Response} The response contains the newly created bookmark object
     */
    createBookmark = (req: Request, res: Response) => {
        console.log(req.params)
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
        let uid = req.params['uid']
        this.bookmarkDao.findBookmarksByUser(uid)
            .then(bookmarks => res.json(bookmarks.map(bookmark => bookmark.bookmarkedTuit)))
            .catch(err => res.status(422).json(err))
    }
}
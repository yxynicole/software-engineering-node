import {Request, Response} from "express";

/**
 * Interface for class Bookmark that represents a bookmarking relation
 *
 * @interface
 */
export default interface bookmarkControllerI{
    /**
     * Create a bookmark object that represents the bookmarking relationship between the bookmarked tuit and the user who bookmarked it.
     * @param req {Request} The request contains the user id and the tuit id. They identify two entities respectively.
     * @param res {Response} The response contains the newly created bookmark object
     */
    createBookmark(req: Request, res: Response): void;

    /**
     * Delete a bookmark object that represents the bookmarking relationship between the bookmarked tuit and the user who bookmarked it.
     * @param req {Request} The request contains the user id and the tuit id. They identify two entities respectively.
     * @param res {Response} The response contains either deletion count or  failure code
     */
    deleteBookmark(req: Request, res: Response): void;

    /**
     * Retrieve all bookmarks bookmarked by the user
     * @param req {Request} The request contains the user id
     * @param res {Response} The response contains all bookmarks bookmarked by the user
     */
    findBookmarksByUser(req: Request, res: Response): void;
}
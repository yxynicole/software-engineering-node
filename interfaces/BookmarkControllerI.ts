import {Request, Response} from "express";

/**
 * bookmarkController Interface
 *
 * @interface
 */
export default interface bookmarkControllerI{
    /**
     * Create a bookmark
     * @param req {Request}
     * @param res {Response}
     */
    createBookmark(req: Request, res: Response): void;

    /**
     * Delete a bookmark
     * @param req {Request}
     * @param res {Response}
     */
    deleteBookmark(req: Request, res: Response): void;

    /**
     * Retrieve all bookmarks by a user
     * @param req {Request}
     * @param res {Response}
     */
    findBookmarksByUser(req: Request, res: Response): void;
}
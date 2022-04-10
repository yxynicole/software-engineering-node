import {Request, Response} from "express";

/**
 * TagController Interface
 */
export default interface TagControllerI {
    /**
     * Create a tag
     * @param req {Request}
     * @param res {Response}
     */
    createTag(req: Request, res: Response): void;

    /**
     * Delete a tag
     * @param req {Request}
     * @param res {Response}
     */
    deleteTag(req: Request, res: Response): void;


}
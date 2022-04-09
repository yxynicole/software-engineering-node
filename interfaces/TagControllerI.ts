import{Request, Response} from "express";

/**
 * TagController Interface
 */
export default interface TagControllerI{
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

    /**
     * Retrieve all tags by an user
     * @param req {Request}
     * @param res {Response}
     */
    findTagsByUser(req: Request, res: Response): void;

    findAllTags(req: Request, res: Response): void;
}
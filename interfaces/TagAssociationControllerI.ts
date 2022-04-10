import {Request, Response} from "express";

/**
 * TagAssociationController Interface
 *
 * @interface
 */
export default interface TagAssociationControllerI{
    createTagAssociation(req: Request, res: Response):void;

    deleteTagAssociation(req: Request, res: Response): void;

    findTagsByBookmark(req: Request, res: Response): void;

    findTagsByUser(req: Request, res: Response): void;
}
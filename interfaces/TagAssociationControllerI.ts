import {Request, Response} from "express";

/**
 * TagAssociationController Interface
 *
 * @interface
 */
export default interface TagAssociationControllerI{
    createTagAssociation(req: Request, res: Response):void;

    deleteTagAssociation(req: Request, res: Response): void;

    findBookmarksByTag(req: Request, res: Response): void;
}
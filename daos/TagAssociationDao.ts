import TagAssociation from "../models/TagAssociation";
import TagAssociationDaoI from "../interfaces/TagAssociationDaoI";
import TagAssociationModel from "../mongoose/tags/TagAssociationModel";
import {ObjectId} from "mongodb";

export default class TagAssociationDao implements TagAssociationDaoI{
    async createTagAssociation(tagId: string, bookmarkId: string): Promise<TagAssociation> {
        return TagAssociationModel.create({
            tag: tagId,
            bookmark: bookmarkId,
        })
    }

    async deleteTagAssociation(tagId: string, bookmarkId: string): Promise<any> {
        return TagAssociationModel.deleteOne({
            tag: tagId,
            bookmark: bookmarkId,
        })
    }

    async findBookmarksByTag(tagId: string): Promise<TagAssociation[]> {
        return TagAssociationModel.find({
            tag: new ObjectId(tagId),
        }).populate({
                path: "bookmark",
                populate: {
                    path: "bookmarkedTuit"
                }
            }
        ).exec()
    }
}
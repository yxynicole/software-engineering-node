import TagAssociation from "../models/TagAssociation";
import TagAssociationDaoI from "../interfaces/TagAssociationDaoI";
import TagAssociationModel from "../mongoose/tags/TagAssociationModel";
import {ObjectId} from "mongodb";
import Tag from "../models/Tag";
import TagModel from "../mongoose/tags/TagModel";
import Bookmark from "../models/Bookmark";
import BookmarkModel from "../mongoose/bookmarks/BookmarkModel";

export default class TagAssociationDao implements TagAssociationDaoI {
    async createTagAssociation(uid: string, tag_id: string, bid: string): Promise<any> {
        const payload = {
            taggedBy: uid,
            tag: tag_id,
            bookmark: bid,
        }
        return TagAssociationModel.findOneAndUpdate(payload, payload, {upsert: true, new: true})
    }

    async deleteTagAssociation(tag_id: string, bid: string): Promise<any> {
        return TagAssociationModel.deleteMany({
            tag: tag_id,
            bookmark: bid,
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

    async findTagAssociationByUser(uid: string): Promise<TagAssociation[]> {
        return TagAssociationModel.find({taggedBy: uid})
            .populate("tag")
            .populate({
                path: "bookmark",
                populate: {
                    path: "bookmarkedTuit"
                }
            })
            .exec();
    }

    async findAllTagsByBookmark(bid: string): Promise<TagAssociation[]> {
        return TagAssociationModel.find({bookmark: bid}).populate('tag').exec();
    }
}
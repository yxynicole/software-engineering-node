import BookmarkDaoI from "../interfaces/BookmarkDaoI";
import BookmarkModel from "../mongoose/bookmarks/BookmarkModel";
import Bookmark from "../models/Bookmark";
import {ObjectId} from "mongodb";
import TagAssociation from "../models/TagAssociation";
import TagAssociationModel from "../mongoose/tags/TagAssociationModel";

/**
 *  Implementation of BookmarkDaoI to create, delete, and read data in the bookmark collection in the database
 */
export default class BookmarkDao implements BookmarkDaoI {
    async createBookmark(uid: string, tid: string): Promise<Bookmark> {
        return BookmarkModel.create({
            bookmarkedTuit: tid,
            bookmarkedBy: uid,
        })
    }

    async deleteBookmark(uid: string, tid: string): Promise<any> {
        return BookmarkModel.deleteOne({
            bookmarkedTuit: tid,
            bookmarkedBy: uid,
        })
    }

    async findBookmarksByUser(uid: string): Promise<Bookmark[]> {
        return BookmarkModel.find({
            bookmarkedBy: new ObjectId(uid),
        }).populate('bookmarkedTuit')
    }

    async getOrCreateBookmarkByTuit(uid: string, tid: string): Promise<Bookmark> {
        const payload = {
            bookmarkedTuit: tid,
            bookmarkedBy: uid,
        }
        return BookmarkModel.findOneAndUpdate(payload, payload, {upsert: true, new: true})
    }

    async findBookmarkByTuit(uid: string, tid: string): Promise<Bookmark | null> {
        const payload = {
            bookmarkedTuit: tid,
            bookmarkedBy: uid,
        }
        return BookmarkModel.findOne(payload).populate("bookmarkedTuit")
    }
}
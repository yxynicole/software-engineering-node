import BookmarkDaoI from "../interfaces/BookmarkDaoI";
import BookmarkModel from "../mongoose/BookmarkModel";
import Bookmark from "../models/Bookmark";
import {ObjectId} from "mongodb";

/**
 *  Implementation of BookmarkDaoI to create, delete, and read data in the bookmark collection in the database
 */
export default class BookmarkDao implements BookmarkDaoI{
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

    async findBookmarkByTuit(tid: string): Promise<Bookmark[]>{
        return BookmarkModel.find({
            bookmarkedTuit: new ObjectId(tid),
        })
    }
}
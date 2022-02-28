import BookmarkDaoI from "../interfaces/BookmarkDaoI";
import BookmarkModel from "../mongoose/BookmarkModel";
import Bookmark from "../models/Bookmark";
import {ObjectId} from "mongodb";

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

}
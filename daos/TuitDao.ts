import Tuit from "../models/Tuit";
import TuitModel from "../mongoose/TuitModel";
import TuitDaoI from "../interfaces/TuitDaoI"
import {Query} from "mongoose";
import {ObjectId} from "mongodb";

/**
 * Implementation of TuitDaoI to read, create, update, and delete data in the tuit collection in the database
 */
export default class TuitDao implements  TuitDaoI{
    async findAllTuits(): Promise<Tuit[]>{
        return TuitModel.find();
    }

    async findTuitsByUser(uid: string): Promise<Query<any, any, {}, any>>{
        return TuitModel.find({
            postedBy: new ObjectId(uid),
        }).populate('postedBy')
    }

    async findTuitById(tid: string): Promise<Query<any, any, {}, any>>{
        return TuitModel.findById(tid);
    }
    async createTuit(tuit: Tuit): Promise<Tuit>{
        return await TuitModel.create(tuit);
    }
    async updateTuit(tid: string, tuit: Tuit): Promise<any>{
        return TuitModel.updateOne({_id:tid},{$set:tuit});
    }
    async deleteTuit(tid: string): Promise<any>{
        return TuitModel.deleteOne({_id:tid});
    }
}

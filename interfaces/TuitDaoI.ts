import Tuit from "../models/Tuit";
import {Query} from "mongoose";
/**
 * TuitDaoI Interface
 *
 * @interface
 */
export default interface TuitDaoI {
    findAllTuits(): Promise<Tuit[]>;

    findTuitsByUser(uid: string): Promise<Query<any, any, {}, any>>;
    findTuitById(tid: string): Promise<Query<any, any, {}, any>>;
    createTuit(tuit: Tuit): Promise<Tuit>;
    updateTuit(tid: string, tuit: Tuit): Promise<any>;
    deleteTuit(tid: string): Promise<any>;
}
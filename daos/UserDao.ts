import User from "../models/User";
import UserModel from "../mongoose/UserModel";
import UserDaoI from "../interfaces/UserDaoI";

/**
 * Implementation of UserDaoI to create, delete, update, and read data in the user collection in the database
 */
export default class UserDao implements UserDaoI {
    async findAllUsers(): Promise<User[]> {
        return UserModel.find();
    }

    async findUserById(uid: string): Promise<any> {
        return UserModel.findById(uid);
    }
    async createUser(user: User): Promise<User> {
        return await UserModel.create(user);
    }
    async deleteUser(uid: string):  Promise<any> {
        return UserModel.deleteOne({_id: uid});
    }
    async updateUser(uid: string, user: User): Promise<any> {
        return UserModel.updateOne({_id: uid}, {$set: user});
    }
}

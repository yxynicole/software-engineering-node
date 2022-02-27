import mongoose from "mongoose";
import User from "../models/User";

const UserSchema = new mongoose.Schema<User>({
    username:{type: String, required: true, unique:true},
    password:{type: String, required: true},
    firstName: String,
    lastName: String,
    email: String,
    profilePhoto: String,
    headerImage: String,
    accountType: {type: String, default: 'PERSONAL', enum: ['PERSONAL', 'ACADEMIC', 'PROFESSIONAL']},
    maritalStatus: {type: String, default: 'SINGLE', enum:['SINGLE','MARRIED','WIDOWED']},
    biography: String,
    dateOfBirth: Date,
    joined: {type: Date, default: Date.now},
    location: {
        latitude: {type: Number, default: 0.0},
        longitude: {type: Number, default: 0.0},
    }
    }, {collection:'users'});
//告诉mongoose.Schema, 要把 user collection 里 的 document 转换成 application里的Oobject的话，要 follow 这些 definition： def1.
export default UserSchema;
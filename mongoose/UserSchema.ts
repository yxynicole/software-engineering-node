import mongoose from "mongoose";
import User from "../models/User";
/**
 * @typedef User An user object
 * @property {username} String User's username
 * @property {password} String User's password
 * @property {firstName} String User's first name
 * @property {lastName} String User's last name
 * @property {email} String User's email
 * @property {profilePhoto} String User's profile photo
 * @property {headerImage} String User's header image
 * @property {accountType} String User's account type
 * @property {maritalStatus} String User's marital status
 * @property {biography} String User's biography
 * @property {dateOfBirth} Date User's date of birth
 * @property {joined} Date User's joining date
 * @property {location} Location Location is defined by a latitude and a longitude
 */
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
export default UserSchema;
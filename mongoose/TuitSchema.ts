import mongoose, {Schema} from "mongoose";
// import User from "../models/User";

const TuitSchema = new mongoose.Schema({
    tuit: String,
    postedOn: Date,
    postedBy: [{type: Schema.Types.ObjectId, ref: 'User'}]
}, {collection: 'tuits'});
export default TuitSchema;
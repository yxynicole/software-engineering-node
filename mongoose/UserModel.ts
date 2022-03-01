import mongoose from "mongoose";
import UserSchema from "./UserSchema";

/**
 * moogoose UserModel based on UserSchema
 */
const UserModel = mongoose.model('UserModel', UserSchema);

export default UserModel;
import mongoose from "mongoose";
import TuitSchema from "./TuitSchema";

/**
 * moogoose TuitModel based on TuitSchema
 */
const TuitModel= mongoose.model('TuitModel', TuitSchema);

export default TuitModel;
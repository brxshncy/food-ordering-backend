import mongoose, { Types } from "mongoose";

// Create User model
const { ObjectId } = Types;

const userSchema = new mongoose.Schema({
  _id: ObjectId,
  auth0Id: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  addressLine1: {
    type: String,
  },
  contact: {
    type: String,
  },
  country: {
    type: String,
  },
  city: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema);
export default User;

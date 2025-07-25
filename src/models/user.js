// import mongoose, { Schema } from "mongoose";

// const UserSchema = new Schema({
//   name: String,
//   email: String,
//   password: {
//     type: String,
//     required: [true, "password is required to set"],
//   },
//   about: String,
// });

// export const User =
//   mongoose.models.users || mongoose.model("users", UserSchema);



// models/user.js
import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
  name: {
    type: String,
    required: true, // Consider making name required
  },
  email: {
    type: String,
    required: true,
    unique: true, // Add unique constraint for email
  },
  password: {
    type: String,
    required: [true, "password is required to set"],
  },
  about: String,
});

export const User = mongoose.models.users || mongoose.model("users", UserSchema);
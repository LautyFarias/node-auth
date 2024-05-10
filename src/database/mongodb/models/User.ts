import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"]
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true
  },
  password: {
    type: String,
    required: [true, "Password is required"]
  },
  img: {
    type: String
  },
  roles: {
    type: [String],
    default: ["DEFAULT_ROLE"],
    enum: ["DEFAULT_ROLE", "ADMIN_ROLE"]
  }
})


export const UserModel = mongoose.model("User", userSchema)

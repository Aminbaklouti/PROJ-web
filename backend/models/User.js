var mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  instagram: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  parties: {
    type: [String]
  },
});
module.exports = mongoose.model("user", userSchema);

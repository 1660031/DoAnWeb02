const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const UserSchema = new Schema({
  sdt: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  gender:{
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  typeBike: {
    type: String,
    required: true
  },
  bsxe: {
    type: String,
    required: true
  },
  activeUser:{
    type: Boolean,
    default: false
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
});
module.exports = User = mongoose.model("users", UserSchema);
var mongoose = require("mongoose");
const Schema = mongoose.Schema;
const partySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    required: true,
  }
});
module.exports = mongoose.model("party", partySchema);

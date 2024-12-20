var mongoose = require("mongoose");
const Schema = mongoose.Schema;
const matchSchema = new Schema({
  partyCode: {
    type: String,
    required: true,
  },
  userId1: {
    type: String,
    required: true,
  },
  userId2: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  }
});
module.exports = mongoose.model("match", matchSchema);

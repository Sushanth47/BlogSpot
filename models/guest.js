const mongoose = require("mongoose");

var guestSchema = new mongoose.Schema({
  vendor: { type: String },
  flags: { type: String },
  tags: [{ type: String }],
});

var Guest = mongoose.model("Guest", guestSchema);
module.exports = Guest;

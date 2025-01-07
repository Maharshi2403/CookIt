const mongoose = require("mongoose");
const key = "mongodb+srv://Maha7178:yA203784@cluster0.xthh0zw.mongodb.net/Auth";

async function connect(key) {
  await mongoose.connect(key);
}

connect(key);

Users = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  id: {
    type: String,
  },
});

module.exports = mongoose.model("user", Users);

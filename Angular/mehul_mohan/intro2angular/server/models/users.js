const { globalLoc } = require('../globals');
const mongoose = require(`${globalLoc}/mongoose`);

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  quote: {type: String, default: "You have no quote"}
});

const User = mongoose.model('user', UserSchema);

module.exports = UserSchema;
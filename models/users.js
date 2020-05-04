var mongoose = require('./db');

var userSchema = mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    password: String,
    token: String,
    salt: String
});

var UserModel = mongoose.model('users', userSchema);


module.exports = UserModel;
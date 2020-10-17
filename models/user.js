const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true, unique: true},
    password: { type: String, requred: true}
});

module.exports = mongoose.model('User', userSchema);
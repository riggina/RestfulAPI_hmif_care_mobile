const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    nama: {
        type: String,
        required: true
    },
    nim: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
}, {timestamps: true})

const User = mongoose.model('users', userSchema);
module.exports = User;
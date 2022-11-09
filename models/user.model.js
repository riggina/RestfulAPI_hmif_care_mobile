var mongoose = require('mongoose')
var Schema = mongoose.Schema

var userSchema = new Schema({
    'name': {
        type: String
    },
    'nim': {
        type: String
    },
    'password': {
        type: String
    },
    'konfirm': {
        type: String
    }
}, {timestamps: true})

module.exports = mongoose.model('User',userSchema)
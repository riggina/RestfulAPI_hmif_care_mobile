var mongoose = require('mongoose')
var Schema = mongoose.Schema

var kuisionerSchema = new Schema({
    'user': {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    'pertanyaan': {
        type: String
    },
    'jawaban': {
        type: Schema.Types.ObjectId,
        ref: 'jawaban'
    }

})
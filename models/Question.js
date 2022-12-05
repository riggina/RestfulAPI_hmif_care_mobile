const mongoose = require("mongoose");
const Schema = mongoose;

const questionSchema = new mongoose.Schema(
    {   
        id_quiz: {
            type: Schema.Types.ObjectId,
            ref: "Quiz"
        },
        question: String,
        answer: [{
            type: String
        }],
    },
    {
        timestamps: true, versionKey: false
    }
)

module.exports = mongoose.model("Question", questionSchema);
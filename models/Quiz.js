const mongoose = require("mongoose");
const Schema = mongoose;

const quizionareSchema = new mongoose.Schema(
    {
        name: String,
        question: [{
            type: Schema.Types.ObjectId,
            ref: "Question"
        }]
    },
    {
        timestamps: true, versionKey: false
    }
);

module.exports = mongoose.model("Quiz", quizionareSchema);
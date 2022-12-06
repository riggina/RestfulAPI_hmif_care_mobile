const mongoose = require("mongoose");
const Schema = mongoose;

const resultSchema = new mongoose.Schema(
    {
        id_user: {
            type: Schema.Types.ObjectId,
            ref: "User"},
        id_quiz: {
            type: Schema.Types.ObjectId,
            ref: "Quiz"},
        total_nilai: String,
    },
    {
        timestamps: true, versionKey: false
    }
)

module.exports = mongoose.model("Result", resultSchema);
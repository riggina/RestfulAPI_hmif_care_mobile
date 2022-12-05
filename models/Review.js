const mongoose = require("mongoose");
const Schema = mongoose;

const reviewSchema = new mongoose.Schema(
    {
        id_user: {
            type: Schema.Types.ObjectId,
            ref: "User"},
        rate: String,
        desc: String,

    },
    {
        timestamps: true, versionKey: false
    }
)

module.exports = mongoose.model("Review", reviewSchema);
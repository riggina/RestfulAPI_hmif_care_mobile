const mongoose = require("mongoose");
const Schema = mongoose;

const ReviewSchema = new mongoose.Schema(
    {   
        id_user: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        id_konseling: {
            type: Schema.Types.ObjectId,
            ref: "Konseling"
        },
        rate: String,
        desc: String,
    },
    {
        timestamps: true, versionKey: false
    }
)

module.exports = mongoose.model("Review", ReviewSchema);
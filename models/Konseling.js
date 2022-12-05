const mongoose = require("mongoose");
const Schema = mongoose;

const konselingSchema = new mongoose.Schema(
    {
        id_user: {
            type: Schema.Types.ObjectId,
            ref: "User"},
        jenis_konseling: String,
        deskripsi: String,
        media_konseling: String,
        jadwal_konseling: String,
        sesi_konseling: String,
        keinginan: String,
    },
    {
        timestamps: true, versionKey: false
    }
)

module.exports = mongoose.model("Konseling", konselingSchema);
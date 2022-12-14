const mongoose = require("mongoose");
const schema = mongoose.Schema;
const Schema = mongoose;
const bcrypt =  require('bcryptjs');

const userSchema = new schema(
    {
        username: {
            type: String,
            required: true
        },
        nim: {
            type: Number,
            required: true,
            validate: [nimValidator, "incorrect nim format"],
        },
        password: {
            type: String,
            required: true
        },
        telepon: String,
        email: String,
        konseling_history: [{
            type: Schema.Types.ObjectId,
            ref: "Konseling"
        }],
        review_history: [{
            type: Schema.Types.ObjectId,
            ref: "Review"
        }]
    },
    {
        timestamps: true, versionKey: false
    }
);

function nimValidator(value) {
    return /11+..+10+..$/.test(value);
};

userSchema.pre("save", async function (next){
    try{
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(this.password, salt);
        this.password = passwordHash;
        next();
    } catch (error) {
        next(error);
    }
});

module.exports = mongoose.model("User", userSchema);
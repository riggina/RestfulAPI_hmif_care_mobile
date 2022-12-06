const dotenv = require("dotenv");
dotenv.config();

const key = process.env.SECRET_KEY;
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require('bcryptjs');

class UserController {
    static async createUser(req, res, next){
        const { username, nim, password,telepon, email} = req.body;
        const user = await User.findOne({ nim });
        if (user)
            return res.status(403).json({
                error: {
                    mesage: "Nim sudah digunakan!"
                },
            });
        const newUser = new User({ username, nim, password, telepon, email});
        try {
            await newUser.save();
            const token = getSignedToken(newUser);
            res.status(200).json({token,});
        } catch (error)  {
            error.status = 400;
            next(error);
        }
    }

    static async loginUser(req, res) {
        try {
            const { nim, password } = req.body;
            const user = await User.findOne({ nim });
            if (!user)
                return res.status(403).json({
                    error: {
                        message: "Invalid NIM"
                    },
                });
            const isValid = await bcrypt.compare(password, user.password);
            if(!isValid)
                return res.status(403).json({
                    error: { message: "Invalid Password!" },
                })
            const token = getSignedToken(user);
            res.status(200).json({
                token,
                message: "Login Success"
            })
        } catch (error) {
            res.status(500).send({ err: error});
        }
    }

    static async loginUserInfo (req, res) {
        try {
            const nim = req.params.nim;
            const user = await User.findOne({nim: nim})
            res.status(200).send(user)
        } catch (error) {
            res.status(500).send({ err: error})
        }
    }
}

getSignedToken = (user) => {
    return jwt.sign(
        {
            id: user._id,
            nim: user.nim,
        },
        key,
        { expiresIn: '12h' }
    );
};

module.exports = UserController
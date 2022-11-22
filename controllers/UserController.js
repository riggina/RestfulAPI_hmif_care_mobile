const dotenv = require("dotenv");
dotenv.config();

const key = process.env.SECRET_KEY;
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require('bcryptjs');

class UserController {
    static async createUser(req, res, next){
        const { username, nim, password } = req.body;
        const user = await User.findOne({ nim });
        if (user)
            return res.status(403).json({
                error: {
                    mesage: "Nim sudah digunakan!"
                },
            });
        const newUser = new User({ username, nim, password});
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
            })
        } catch (error) {
            res.status(500).send({ err: error});
        }
    }

    static async profileUser(req, res) {
        try {
            const id = req.user_id;

            const user = await User.findOne({_id: id});
            res.status(200).json({
                username: user.username,
                nim: user.nim,
                foto_profil: user.foto_profil,
                telepon: user.telepon,
                email: user.email
            })
        } catch (error) {
            res.status(500).json({
                message: 'Gagal memuat profil',
                error: error
            })
        }
    }

    static async updateProfile(req, res) {
            const id = req.user_id;
            User.findOne({_id: id}, function(err, user) {
                if (err) {
                    return res.status(500).json({
                        message: 'Tidak dapat memuat user',
                        error: err
                    });
                }

                if (!user) {
                    return res.status(404).json({
                        message: 'User Tidak ditemukan'
                    })
                }

                user.username = req.body.username ? req.body.username : user.username;
                user.nim = req.body.nim ? req.body.nim : user.nim;
                user.telepon = req.body.telepon ? req.body.telepon : user.telepon;
                user.email = req.body.email ? req.body.email : user.email;

                user.save(function (err, user){
                    if (err) {
                        return res.status(500).json({
                            mesage: 'Gagal merubah profil',
                            error: err
                        });
                    }

                    return res.status(200).json(user);
                });
            });
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
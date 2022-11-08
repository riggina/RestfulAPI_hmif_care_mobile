var UserModel = require('../userModel.js');

const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');

/**
 * authController.js
 *
 * @description :: Server-side logic for managing authentication.
 */
module.exports = {

    /**
     * authController.register()
     */
    register: async function (req, res) {
        try {
            const password = passwordHash.generate(req.body.password);
            const avatar = "https://avatars.dicebear.com/api/initials/" + req.body.nama + ".svg";

            var user = new UserModel({
                nama : req.body.nama,
                nim : req.body.nim,
                password : password,
                confirm_password : confirm_password
            });

            const dataUser = await user.save();
            
            

            res.status(200).json(dataUser);
        } catch(error) {
            res.status(422).send({
                error: error.message
            })
        }
    },

    /**
     * authController.login()
     */
    login: function (req, res) {
        const nim = req.body.nim;
        const password = req.body.password;

        UserModel.findOne({ nim: nim }, function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting user.',
                    error: err
                });
            }

            if (!user) {
                return res.status(404).json({
                    message: 'No such user'
                });
            }

            const verify = passwordHash.verify(password, user.password);

            if(verify == true)
            {
                const userToken = {
                    id: user.id,
                    nim: user.nim
                }

                const token = jwt.sign({ userToken }, process.env.TOKEN_SECRET, {
                    expiresIn: '30m'
                })

                return res.status(200).send({
                    token: token
                })
            } else {
                return res.status(422).send({
                    status: 422,
                    message: "Password salah"
                })
            }
        })
    },

    /**
     * authController.logout()
     */
    logout: function (req, res) {
        if(req.headers.authorization) {
            const token = req.headers.authorization.split(' ')[1]

            var blacklist = new BlacklistModel({ token: token });

            blacklist.save(function (err, user) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when logouting',
                        error: err
                    });
                }
    
                return res.status(201).json({
                    message: "Logout success"
                });
            });

        } else {
            res.status(422).send({
                status: 422,
                message: "Masukkan token untuk logout"
            })
        }
    }
};
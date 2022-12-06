const { model } = require('mongoose');
const KonselingModel = require('../models/Konseling')

class KonselingController {
    static async getAllKonseling(req, res){
        try {
            const KonselingList = await KonselingModel.find()
            res.status(200).send(KonselingList)
        } catch (error) {
            res.status(500).send({err: error})
        }
    }

    static async createKonseling (req, res) {
            const {id_user, jenis_konseling, deskripsi, media_konseling, jadwal_konseling, sesi_konseling, keinginan} = req.body;
            const newKonseling = new KonselingModel({
                id_user: id_user,
                jenis_konseling: jenis_konseling,
                deskripsi: deskripsi,
                media_konseling: media_konseling,
                jadwal_konseling: jadwal_konseling,
                sesi_konseling: sesi_konseling,
                keinginan: keinginan
            })
            try {
                await newKonseling.save(async(err, newKonseling) => {
                    await KonselingModel.findByIdAndUpdate({_id: id_user},
                    {$addToSet: {konseling: newKonseling._id}},
                    {new: true});  
                });
                res.status(201).send(newKonseling);
            } catch (error) {
                res.status(500).send({err: error});
                console.log(error)
            }
        
    }
}

module.exports = KonselingController;
const { model } = require('mongoose');
const ResultModel = require('../models/Result');

class ResultController {
    //GET
    static async getAllResult(req, res) {
        try {
            const ResultList = await ResultModel.find()
            res.status(200).json(ResultList)
        } catch (error) {
            res.status(500).send({err: error})
        }
    }
    //GETbyID
    static async getByIdResult (req, res){
        try {
            const {id} = req.params;
            const resultByID = await ResultModel.findById(id).populate('result')
            res.status(200).json(resultByID);
        } catch (error) {
            res.status(500).send({err: error})
        }
    }
    //POST
    static async createResult(req, res){
        const {id_user, id_quiz, total_nilai } = req.body;
        const newResult = new ResultModel({
            id_user: id_user,
            id_quiz: id_quiz,
            total_nilai: total_nilai
        })
        try{
            const saved = await newResult.save();
            res.status(201).send(saved);
            console.log(saved)
        } catch (error) {
            res.status(500).send({err : error})
            
        }
    }
}

module.exports = ResultController;
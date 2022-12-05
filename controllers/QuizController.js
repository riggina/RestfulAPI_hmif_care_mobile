const { response } = require("express");
const QuizModel = require("../models/Quiz")

class quizController {
    static async getAllQuiz(req, res) {
        try{
            const quizList = await QuizModel.find()
            res.status(200).send(quizList)
        } catch (error) {
            res.status(500).send({err: error})
        }
    }

    static async getQuizById(req, res) {
        try {
            const {id} = req.params;
            const descQuiz = await QuizModel.findById(id).populate('question')
            res.status(200).json(descQuiz);
        } catch (error) {
            res.status(500).send({err: error})
            console.log(error)
        }
    }

    static async addQuiz(req, res) {
        const {name} = req.body;
        const newQuiz = new QuizModel({
            name: name,
        });
        const check = await QuizModel.findOne({ name })
        if(check){
            return res.status(403).json({
                error: {
                    message: "Quiz Already Eksis"
                }
            })
        }
        try {
            const saved = await newQuiz.save();
            res.status(201).send(saved);
        } catch(error){
            response.status(500).send({err: error})
        }
    }

    static async updateQuiz(req, res) {
        try {
            const {id} = req.params;
            const {name} = req.body;
            await QuizModel.findByIdAndUpdate({_id: id}, {
                name: name,
            })
            res.status(200).send({message: "berhasil mengupdate quiz"})
        } catch (error) {
            res.status(500).send({ err: error})
            console.log(error)
        }
    }

    static async deleteQuiz(req, res) {
        try{
            const {id} = req.params;
            await QuizModel.findByIdAndDelete(id)
            res.status(200).send({ message: `${id} berhasil dihapus`})
        } catch (error) {
            res.status(500).send({err: error})
        }
    }
}

module.exports = quizController;
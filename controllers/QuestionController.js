const QuestionModel = require("../models/Question");
const QuizModel = require("../models/Quiz")

class QuestionController {
    static async getAllQuestion(req, res){
        try {
            const QuestionList = await QuestionModel.find()
            res.status(200).send(QuestionList)
        } catch (error) {
            res.status(500).send({err: error})
        }
    }

    static async createQuestion (req, res) {
        const {id_quiz, question, answer} = req.body;
        const newQuestion = new QuestionModel({
            id_quiz: id_quiz,
            question: question,
            answer: answer,
        });
        try {
            await newQuestion.save(async(err, newQuestion) => {
                await QuizModel.findByIdAndUpdate({_id: id_quiz},
                    {$addToSet: {question: newQuestion._id}},
                    {new: true});
            });
            res.status(201).send(newQuestion);
        } catch (error) {
            res.status(500).send({error: error});
            console.log(error)
        }
    }

    static async deleteQuestion(req, res){
        try{
            const {id} = req.params;
            await QuestionModel.findByIdAndDelete(id)
            res.status(200).send({ message: `${id} has been deleted`})
        } catch(error){
            res.status(500).send({error: error})
            console.log(error)
        }
    }
}

module.exports = QuestionController;
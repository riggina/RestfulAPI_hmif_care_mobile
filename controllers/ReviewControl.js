const { response } = require("express");
const ReviewModel = require("../models/Review");
const UserModel = require("../models/User");

class reviewController {
    static async createReview(res, req) {
        const {id_user,rate, desc} = req.body;
        const newReview = new ReviewModel({
            id_user: id_user,
            rate: rate,
            desc: desc
        });
        try {
            await newReview.save(async(err, newReview) => {
                await UserModel.findByIdAndUpdate({_id: id_user},
                    {$addToSet: {question: newReview._id}},
                    {new: true});
            });
            res.status(201).send(newReview);
        } catch (error) {
            response.status(500).send({error: error})
            console.log(error)
        }
    }

    static async getReview(res, req) {
        try{
            const reviewList = await ReviewModel.find()
            res.status(200).send(reviewList)
        } catch (error) {
            res.status(500).send({err: error})
        }
    }

    static async getReviewByUser(res, req) {
        try{
            const {id_user} = req.params;
            const reviewList = await ReviewModel.find({id_user: id_user})
            res.status(200).send(reviewList)
        } catch (error) {
            res.status(500).send({error: error})
            console.log(error)
        }
    }
}

module.exports = reviewController;
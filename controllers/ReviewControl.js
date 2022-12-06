const ReviewModel = require("../models/Review");
const UserModel = require("../models/User");
const KonselingMOdels = require("../models/Konseling");

class ReviewController {
    static async getAllReview(req, res){
        try {
            const ReviewList = await ReviewModel.find().populate("id_user")
            res.status(200).send(ReviewList)
        } catch (error) {
            res.status(500).send({err: error})
        }
    }

    static async createReview (req, res) {
        const {id_user, id_konseling, rate, desc} = req.body;
        const newReview = new ReviewModel({
            id_user: id_user,
            id_konseling: id_konseling,
            rate: rate,
            desc: desc,
        });
        try {
            await newReview.save(async(err, newReview) => {
                await UserModel.findByIdAndUpdate({_id: id_user},
                    {$addToSet: {review_history: newReview._id}},
                    {new: true});
                await KonselingMOdels.findByIdAndUpdate({_id: id_konseling},
                    {$addToSet: {isReview: true}},
                    {$addToSet: {id_review: newReview._id}},
                    {new: true});
            });
            res.status(201).send(newReview);
        } catch (error) {
            res.status(500).send({error: error});
            console.log(error)
        }
    }

    static async getReviewByUser(req, res){
        try {
            const id_user = req.params.id_user;
            const reviewList = await ReviewModel.find({id_user: id_user})
            if (reviewList){
                
            }
            res.status(200).send(reviewList)
        } catch (error) {
            res.status(500).send({err: error})
        }
    }
}

module.exports = ReviewController;
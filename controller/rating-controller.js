const db = require("../models");
const Rating = db.ratings;
const Op = db.Sequelize.Op;


// Create and Save a new post
exports.createRating = (req, res) => {
    // Validate request
    if (!req.body.rating) {
        res.status(400).send({
            message: "rating can not be empty!"
        });
        return;
    }

    // Create a rating
    const ratingdata = {
        rating: req.body.rating,
        postId: req.params.id
    };
    console.log(ratingdata)
    // Save Post in the database
    try {
        Rating.create(ratingdata)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while creating the ratingdata."
                });
            });
    } catch (err) {
        return res.status(500).send({
            message:
                err.message || "Some error occurred while adding the Project",
        });
    }
};
const db = require("../models");
const Rating = db.ratings;
const Op = db.Sequelize.Op;


// Create and Save a new Rating
exports.createRating = (req, res) => {
    // Validate request
    if(!req.params.id){
        res.status(400).send({
            message: "Post id can not be empty!"
        });
        return;
    }
    if (!req.body.ratings) {
        res.status(400).send({
            message: "rating can not be empty!"
        });
        return;
    }

    // Create a rating
    const ratingdata = {
        ratings: req.body.ratings,
        postId: req.params.id
    };
    console.log(ratingdata)
    // Save Rating in the database
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

// Retrieve all Rating from the database by postid.
exports.findAllRatings = (req, res) => {
    Rating.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving rating."
            });
        });
};

// Find a single rating with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Rating.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving raing with id=" + id
            });
        });
};

// Update a Rating by the id in the request
exports.updateRating = (req, res) => {
    const id = req.params.id;
    // Validate request
    if (!req.body.ratings) {
        res.status(400).send({
            message: "rating can not be empty!"
        });
        return;
    }

    Rating.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Rating was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Rating with id=${id}. Maybe Rating was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Rating with id=" + id
            });
        });
};


// Delete a Rating with the specified id in the request
exports.deleteRating = (req, res) => {
    const id = req.params.id;

    Rating.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Rating was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot Rating Post with id=${id}. Maybe Rating was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Rating with id=" + id
            });
        });
};

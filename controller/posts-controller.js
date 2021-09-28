const db = require("../models");
const Post = db.posts;
const Op = db.Sequelize.Op;


// Create and Save a new Tutorial
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
        res.status(400).send({
            message: "title can not be empty!"
        });
        return;
    }

    // Create a Tutorial
    const postdata = {
        title: req.body.title,
        description: req.body.description,
    };

    // Save Post in the database
    try {
        Post.create(postdata)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while creating the Tutorial."
                });
            });
    } catch (err) {
        return res.status(500).send({
            message:
                err.message || "Some error occurred while adding the Project",
        });
    }
};
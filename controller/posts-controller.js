const db = require("../models");
const Post = db.posts;
const Op = db.Sequelize.Op;


// Create and Save a new post
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

// Retrieve all post from the database.
exports.findAll = (req, res) => {

    Post.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving post."
            });
        });
};

// Find a single post with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Post.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving post with id=" + id
            });
        });
};

// Update a Post by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    // Validate request
    if (!req.body.title) {
        res.status(400).send({
            message: "title can not be empty!"
        });
        return;
    }

    Post.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Post was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update post with id=${id}. Maybe Tutorial was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Post with id=" + id
            });
        });
};
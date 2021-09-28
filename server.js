const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./models/index");

const app = express();
const post = require("./controller/posts-controller");
const rating = require("./controller/rating-controller");
var corsOptions = {
  origin: "http://localhost:8000"
};

app.use(cors(corsOptions));

db.sequelize.sync().then(() => {
  console.log('Connection has been established successfully.');
}).catch((err) => {
  console.log(`Unable to sync the database: ${err}`);
});

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

//create a post
app.post("/api/post/", post.create);
// Retrieve all Post
app.get("/api/post/", post.findAll);
// Retrieve a single Post with id
app.get("/api/post/:id", post.findOne);
// Update a pst with id
app.put("/api/post/:id", post.update);
// Delete a Post with id
app.delete("/api/post/:id", post.delete);

//Create a rating
app.post("/api/rating/:id", rating.createRating)
// Retrieve all Rating
app.get("/api/rating/:id", rating.findAllRatings);
// Retrieve rating by id
app.get("/api/rating/:id", rating.findOne)
// Update a post with id
app.put("/api/rating/:id", rating.updateRating);
// Delete a Post with id
app.delete("/api/rating/:id", rating.deleteRating);


require("./routes/routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
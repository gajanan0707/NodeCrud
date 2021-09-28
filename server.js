const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./models/index");

const app = express();
const post = require("./controller/posts-controller");
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

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to application." });
});
app.post("/", post.create);
require("./routes/routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
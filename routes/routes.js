module.exports = app => {
    const post = require("../controller/posts-controller");
  
    var router = require("express").Router();
  
    // Create a new Post
    router.post("/", post.create);
  
    app.use("/api/post", router);
  };
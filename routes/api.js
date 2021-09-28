module.exports = (app) => {
    const posts = require('../controller/posts-controller.js');

    app.get('/test', (request, response) => {
        response.json({ info: 'Node.js, Express, and Postgres API' })
    })

    // Create a new Posts
    app.post('/api/posts', posts.create);

    // Retrieve all Posts
    app.get('/api/posts', posts.findAll);

    // Retrieve a single Posts with PostsId
    app.get('/api/posts/:postsId', posts.findOne);

    // Update a Posts with PoststId
    app.put('/api/posts/:postsId', posts.update);

    // Delete a Posts with PoststId
    app.delete('/api/posts/:postsId', posts.delete);
}
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

app.use(bodyParser.json())

app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome" });
});

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})
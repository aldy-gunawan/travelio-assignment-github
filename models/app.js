const express = require('express');
const app = express();
const mongoose = require('mongoose');

// connect to database
const uri = "mongodb+srv://aldygnwan:aldy12345@cluster0.nyiyypb.mongodb.net/travelio?retryWrites=true&writeConcern=majority";
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const path = require('path');
const port = process.env.PORT || 5000;
if (process.env.NODE_ENV === "production") {
    app.use(express.static('client/build'));
    app.get("*", function(req, res) {
        res.sendFile(path.join(__dirname, '/client/build', 'index.html');
    })
}

const db = mongoose.connection
db.on('error', (error) => console.error(error));
db.once('open', () => console.log("Connected to database"))

app.use(express.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  
    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }

    next();
  });

const booksRouter = require('./routes/books');
app.use('/books', booksRouter);

app.listen(port, () => console.log("Server Started"));
const express = require('express')
const app = express()
const port = 5000
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));
const path = require("path");
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'public'));


const Article = require("./models/articleSchema")

const connectLivereload = require("connect-livereload");
app.use(connectLivereload());

liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

// app.get('/', function(req, res) {
//     res.sendFile(path.join(__dirname, '/templates/index.html'));
//   });

// app.use(express.static('public'))

app.get('', (req, res) => {
  Article.find()
    .then((result) => {
      res.render("index", { toptitle: "Home", arrArticle: result })
    })
    .catch((err) => {
      console.log(err)
    })
});

app.get('/addArticle', (req, res) => {
  
      res.render("addArticle", { toptitle: "Add Article"})
   
});

app.get('/index1.html', (req, res) => {
  res.sendFile("views/index1.html", { root: __dirname })
});







app.post("/", (req, res) => {
  const article = new Article(req.body);

  console.log(req.body);

  article
    .save()
    .then((result) => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
});












const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://omar:omar123@cluster0.w3de338.mongodb.net/all-data?retryWrites=true&w=majority")
  .then((result) => {
    app.listen(port, () => {
      console.log(`Example app listening on port HTTPS://localhost:${port}`)
    });
  })
  .catch((err) => {
    console.log(err);
  });












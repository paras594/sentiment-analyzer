const express = require("express");
const Sentiment = require("sentiment");
const sentiment = new Sentiment();

const app = express();

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(__dirname + "/public"));

app.get("/app", (req, res) => {
   res.render("index", {
      heading: "Sentiment Analyzer",
      data: ""
   });
});

app.post("/app", (req, res) => {
   let str = req.body.input;

   let result = sentiment.analyze(str);
   // { score: 3,
   //    comparative: 0.75,
   //    tokens: [ 'paras', 'is', 'good', 'boy' ],
   //    words: [ 'good' ],
   //    positive: [ 'good' ],
   //    negative: [] }
   console.log(result);
   // let data = { data: result };

   res.render("index", { heading: "Sentiment Analyzer", data: result });
});

app.listen(3000, () => console.log(`app started on port: localhost:3000`));

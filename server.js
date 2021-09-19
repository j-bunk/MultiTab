const express = require("express");
const mongoose = require("mongoose");
const CombinedUrl = require("./models/combinedUrl");
const app = express();
var cors = require("cors");

app.use(cors());

mongoose.connect("mongodb://localhost/urlCombiner", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

app.post("/urlCombiner", async (req, res) => {
  const parsedUrls = req.body.fullUrls.split(",");
  const combinedUrl = await CombinedUrl.create({
    full: parsedUrls,
  });
  return res.status(200).json(combinedUrl.combined);
});

app.get("/:combinedUrl", async (req, res) => {
  const combinedUrl = await CombinedUrl.findOne({
    combined: req.params.combinedUrl,
  });
  if (combinedUrl == null) return res.sendStatus(404);
  res.render("index", { combinedUrl: combinedUrl });
});

app.listen(process.env.PORT || 5000);

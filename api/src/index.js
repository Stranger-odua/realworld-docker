const express = require("express");
const mongoose = require("mongoose");
const {connectDb} = require("./helpers/db");
const {port, host, db, authApiUrl} = require("./configuration");
const axios = require("axios");
const {response} = require("express");

const app = express();
const postSchema = new mongoose.Schema({
  name: String
});
const Post = mongoose.model("Post", postSchema);

const startServer = () => {
  app.listen(port, () => {
    console.log(`Started api service on port ${port}`);
    console.log(`Our host is ${host}`);
    console.log(`Database url ${db}`);

    const silence = new Post({name: "Silence"});
    silence.save(function (err, savedSilence) {
      if (err) return console.error(err);
      console.log("savedSilence vmeste s volumes", savedSilence);
    });
  });
};

app.get("/test", (req, res) => {
  res.send("Our api server is working correctly");
});

app.get('/api/testapidata', (req, res) => {
  res.json({
    testwithapi: true
  })
})

app.get("/testwithcurrentuser", (req, res) => {
  // console.log("authApiUrl", authApiUrl);
  axios.get(authApiUrl + "/currentUser").then(response => {
    res.json({
      testwithcurrentuser: true,
      currentUserFromAuth: response.data
    })
  })
});

connectDb()
  .on("error", console.log)
  .on("disconnected", connectDb)
  .once("open", startServer);

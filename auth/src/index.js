const express = require("express");
const { connectDb } = require("./helpers/db");
const { port, host, db } = require("./configuration");

const app = express();

const startServer = () => {
  app.listen(port, () => {
    console.log(`Started auth service on port ${port}`);
    console.log(`Our host is ${host}`);
    console.log(`Database url ${db}`);
  });
};

app.get("/test", (req, res) => {
  res.send("Our auth server is working correctly");
});


connectDb()
  .on("error", console.log)
  .on("disconnected", connectDb)
  .once("open", startServer);

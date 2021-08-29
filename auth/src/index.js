const express = require("express");
const {port, host, db, apiUrl} = require("./configuration");
const {connectDb} = require("./helpers/db");
const axios = require("axios");
const {response} = require("express");
const app = express();

const startServer = () => {
    app.listen(port, () => {
        console.log(`Started authentication service on port ${port}`);
        console.log(`Our host is ${host}`);
        console.log(`Database url ${db}`);
    });
};

app.get("/test", (req, res) => {
    res.send("Сервер аутентификации работает корректно");
});

app.get('/testwithapidata', (req, res) => {
    axios.get(apiUrl + '/testapidata').then(response => {
        res.json({
            testapidata: response.data.testwithapi
        })
    })
})

app.get("/api/currentUser", (req, res) => {
    res.json({
        id: "1234",
        email: "foo@gmail.com"
    });
});

connectDb()
    .on("error", console.log)
    .on("disconnected", connectDb)
    .once("open", startServer);

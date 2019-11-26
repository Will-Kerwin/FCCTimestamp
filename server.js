// server.js
// where your node app starts

// init project
const express = require("express");
const app = express();

// we've started you off with Express,
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(request, response) {
  response.sendFile(__dirname + "/views/index.html");
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});

app.get("/api/timestamp/:date_string", (req, res) => {
  const param = req.params.date_string
  const currentDate = new Date()
  
   if (param == undefined) {
    res.json({ "unix": currentDate.getTime(), "utc": currentDate.toUTCString() })
  } else if (isNaN(param) && new Date(param).toString() != "Invalid Date") { // 2015-12-25
    res.json({ "unix": new Date(param).getTime(), "utc": new Date(param).toUTCString() })
  } else if (!isNaN(param) && new Date(param * 1000).toString() != "Invalid Date") { // 1450137600
    res.json({ "unix": param, "utc": new Date(param * 1000).toUTCString() })
  } else {
    res.json({ "error": "Invalid Date" })
  }
  
});
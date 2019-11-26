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
  const {date_string} = req.params
  if (date_string.isValid()){
   let date = new Date(date_string) 
   res.json({"unix":date.getTime(), "utc" : date.toUTCString()});
  }else if (date_string === ""){
    let date = new Date()
    res.json({"unix":date.getTime(), "utc" : date.toUTCString()})
  } else{
    res.json({error: "Invalid Date"})
  }
});
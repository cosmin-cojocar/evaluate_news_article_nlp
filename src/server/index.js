require("dotenv").config();

const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const mockAPIResponse = require("./mockAPI.js");
const aylien = require("aylien_textapi");

// Start up an instance of app
const app = express();

// Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static("./dist"));

// Initialize all routes
app.get("/test", (req, res) => {
  // number of spaces for indentation
  app.set("json spaces", 2);
  res.json(mockAPIResponse);
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../../dist", "index.html"));
});

app.post("/evaluate", (req, res) => {
  const link = req.body.link;

  if (link) {
    // get Aylien engine
    const nlpEngine = new aylien({
      application_id: process.env.API_ID,
      application_key: process.env.API_KEY
    });

    if (nlpEngine) {
      nlpEngine.classify({ url: link }, (error, response) => {
        if (error === null) {
          res.json(response);
        } else {
          const message = "Could not classify this news article.";
          res.json(JSON.stringify(message));
        }
      });
    }
  } else {
    const message = "Please provide a URL in order to have something to evaluate.";
    res.json(JSON.stringify(message));
  }
});



// Port the app will listen to for incoming requests
const port = 3000;

// Spin up the server
app.listen(port, () => {
  // Callback to debug
  console.log(`Server listening on port: ${port}`);
});

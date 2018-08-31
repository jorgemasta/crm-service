require("dotenv").config();

const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");

const router = require("./config/router");
const { DB_HOST, DB_PORT, DB_NAME, SERVER_PORT } = process.env;
const app = express();

// DB Setup
mongoose.set("useCreateIndex", true);
mongoose.connect(
  `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`,
  { useNewUrlParser: true }
);

// App Setup
app.use(morgan("combined"));
app.use(bodyParser.json({ type: "*/*" }));
router(app);

// Server Setup
const port = SERVER_PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log(`Server listening on: ${port}`);

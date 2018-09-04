require("dotenv").config();

const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const mkdirp = require("mkdirp");

const router = require("./config/router");

const errorHandler = require("./helpers/errors/errorHandler");
const logErrors = require("./helpers/errors/logErrors");

const { DB_HOST, DB_PORT, DB_NAME, SERVER_PORT, UPLOAD_PATH } = process.env;

const app = express();

// DB Setup
mongoose.set("useCreateIndex", true);
mongoose.connect(
  `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`,
  { useNewUrlParser: true }
);

// Prepare File Storage Folder
mkdirp.sync(UPLOAD_PATH);

// App Setup
app.use(morgan("combined"));
app.use("/uploads", express.static("uploads"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
router(app);
app.use(logErrors);
app.use(errorHandler);

// Server Setup
const port = SERVER_PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log(`Server listening on: ${port}`);

const express = require("express");
require("express-async-errors");
const app = express();
const cors = require("cors");
const blogRouter = require("./controllers/blogs");
const userRouter = require("./controllers/users");
const middleware = require("./utils/middleware");
const logger = require("./utils/logger");
const config = require("./utils/config");
const loginRouter = require("./controllers/login");
const mongoose = require("mongoose");

require("dotenv").config();
app.use(middleware.tokenExtractor)
app.use(middleware.userExtractor)

const dbPassword = process.env.DB_PASSWORD;
const dbUrl = process.env.DB_URL.replace("<password>", dbPassword);

mongoose.set("strictQuery", false);

logger.info("connecting to", config.MONGODB_URI);

mongoose
  .connect(dbUrl)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => console.log("Error connecting to mongo DB", error.message));

app.use(cors());
app.use(express.json());

app.use("/api/blogs", blogRouter);
app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;

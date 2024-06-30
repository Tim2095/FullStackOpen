const express = require("express");
const config = require("./utils/config");
const app = express();
const cors = require("cors");
const userRouter = require("./controllers/user");
const mongoose = require("mongoose");
const loginRouter = require('./controllers/login')
const blogRouter = require('./controllers/blogs')
mongoose.set("strictQuery", false);


console.log("connecting to ", config.MONGODB_URI);
mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    console.log("connected to Mongo DB");
  })
  .catch((error) => {
    console.log("failed to connect to database ", error);
  });

app.use(express.json());
app.use(cors());

app.use("/api/users", userRouter);
app.use('/api/blogs', blogRouter)
app.use('/api/login', loginRouter)

module.exports = app;

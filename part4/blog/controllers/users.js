const userRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

userRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate('blogs', {title: 1, url: 1, author: 1, likes: 1, })

  response.json(users);
});

userRouter.post("/", async (request, response, next) => {
  const { userName, name, password } = request.body;
  try {
    if (!userName || !password) {
      return response.status(400).json("Password or username is missing");
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
      name,
      userName,
      passwordHash,
    });

    const savedUser = await user.save();

    response.status(201).json(savedUser);
  } catch (err) {
    next(err); 
  }
});

module.exports = userRouter;

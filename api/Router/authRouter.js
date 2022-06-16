const express = require("express");
const Router = express.Router();
const User = require("../Models/User");
const { isAuth } = require("../Middlewares/User");

Router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });
  if (!user) return res.status(403).send("check email");
  if (user.verifyPassword(password)) {
    return res
      .cookie("refresh_token", user.getRefresh(), { httpOnly: true })
      .send(user.getJWT());
  }
  return res.status(403).send("check pass");
});

Router.post("/register", isAuth, (req, res) => {
  User(req.body)
    .save()
    .then((res) => res.status(201))
    .catch((err) => res.status(500).send(err));
});

Router.get("/", isAuth, (req, res) => {
  res.send(req.user.getJWT());
});

Router.delete("/delete", async (req, res) => {
  try {
    const { name: str } = req.body;
    await User.findOneAndDelete({ name: str });
    res.send("success");
  } catch (error) {
    (error) => res.send(error);
  }
});

Router.get("/employees", isAuth, async (req, res) => {
  try {
    const employees = await User.find({ isAdmin: false });
    const admins = await User.find({ isAdmin: true });
    res.status(200).json({
      employees,
      admins,
    });
  } catch (error) {
    res.send(error);
  }
});

Router.patch("/:id", isAuth, async (req, res) => {
  try {
    const { id: userID } = req.params;
    const user = await User.findOneAndUpdate({ _id: userID }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user || user.id !== req.user.id)
      return res.status(404).json({ message: "No user found" });
    user.save();
    res.status(200).json(user);
  } catch (error) {
    res.send(error);
  }
});

Router.get("/veriftoken/:user_id/:token", async (req, res) => {
  const { user_id, token } = req.params;
  const user = await User.findOne({ _id: user_id });
  if (user.email_token !== token) return res.status(401).send();
  user.email_token = null;
  user.active = true;
  user
    .save()
    .then(() => res.status(201).send("thank you"))
    .catch((err) => res.status(500).send(err));
});

module.exports = Router;

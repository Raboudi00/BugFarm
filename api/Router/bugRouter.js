const express = require("express");
const Router = express.Router();
const Bug = require("../Models/Bug");
const { isAuth } = require("../Middlewares/User");
const { isBug, isMyBug } = require("../Middlewares/Bug");

Router.post("/", isAuth, isBug, async (req, res) => {
  try {
    const bug = new Bug({ ...req.body, user_id: req.user._id });
    if (!bug) return res.status(500);
    await bug.save();
    res.status(201).json(bug);
  } catch (error) {
    res.send(error);
  }
});

Router.get("/mybugs", isAuth, async (req, res) => {
  try {
    const bugs = req.user.isAdmin
      ? await Bug.find({ user_id: req.user._id })
      : await Bug.find({ assignee: req.user._id });
    if (!bugs) return res.status(404).send("no bugs not found");
    res.status(200).json(bugs);
  } catch (error) {
    res.send(error);
  }
});

Router.get("/:id", isAuth, async (req, res) => {
  try {
    const { id: userID } = req.params;
    const bug = await Bug.find({ _id: userID });
    if (!bug) return res.status(404).send("bug not found");
    res.status(200).json(bug);
  } catch (error) {
    res.json(error);
  }
});

Router.put("/:id", isAuth, isBug, isMyBug, async (req, res) => {
  try {
    const { id: bugID } = req.params;
    const bug = await Bug.findOneAndUpdate({ _id: bugID }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!bug) return res.status(404).send("bug not found");
    res.status(200).json(bug);
  } catch (error) {
    res.send(error);
  }
});

Router.delete("/:id", isAuth, async (req, res) => {
  try {
    const { id: bugID } = req.params;
    const bug = await Bug.findByIdAndDelete({ _id: bugID });
    if (!bug) return res.status(404).send("bug not found");
    res.status(200).send("deleted successfuly");
  } catch (error) {
    res.send(error);
  }
});

module.exports = Router;

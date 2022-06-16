const Bug = require("../Models/Bug");

const isBug = (req, res, next) => {
  Bug.findOne({ id: req.params.id })
    .then((data) => {
      if (!data) return res.status(404).send();
      req.bug = data;

      next();
    })
    .catch((err) => res.status(500).send(err));
};

const isMyBug = (req, res, next) => {
  if (!req.user) return res.status(401).send("1");
  if (!req.bug) return res.status(401).send("2");
  if (req.user.id.toString() !== req.bug.user_id.toString())
    return res.status(401).send("3");
  next();
};

module.exports = { isBug, isMyBug };

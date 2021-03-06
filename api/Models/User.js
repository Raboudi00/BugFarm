const mongoose = require("mongoose");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const emailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const bcryptRound = 12;
const jwt_secret = process.env.JWT_SECERT;

const user = mongoose.Schema({
  name: {
    type: String,
    unique: [true, "This username is already taken"],
    required: [true, "provide a user name"],
  },
  lastName: { type: String, required: [true, "provide a last name"] },
  email: {
    type: String,
    required: [true, "provide an email"],
    unique: [true, "A user with this email is already created"],
    validate: {
      validator: (email) => email.match(emailRegex),
      message: "You must provide a valid email Ex: xxxx@mail.xx",
    },
  },
  isAdmin: {
    type: Boolean,
    required: [true, "set your user's privilege"],
  },
  password: {
    type: String,
    required: [true, "provide a password"],
    set: (password) => bcrypt.hashSync(password, bcryptRound),
  },
});

user.methods.verifyPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

user.methods.getJWT = function () {
  return {
    user: this.toJSON(),
    jwt: {
      token: jwt.sign(this.toJSON(), jwt_secret, { expiresIn: 900 }),
      expires: 900,
    },
  };
};

user.methods.getRefresh = function () {
  return jwt.sign(this.toJSON(), jwt_secret);
};

user.methods.toJSON = function () {
  return {
    id: this._id,
    name: this.name,
    lastName: this.lastName,
    email: this.email,
    isAdmin: this.isAdmin,
  };
};

module.exports = mongoose.model("User", user);

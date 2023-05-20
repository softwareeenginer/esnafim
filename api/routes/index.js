const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();

const { Users } = require('../helper/db');

// Models

/* GET home page. */
router.get("/", (req, res) => {
  res.render("index", { title: "Express" });
});


// -------- LOGIN -------- //
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await Users.findOne({
      where: { email: email },
      attributes: ['userId', 'password', 'status']
    });

    if (!user) {
      res.json({
        result: false,
        error: 'not_found'
      });
      return;
    }

    let pass_control = await bcrypt.compare(password, user.password);
    if (!pass_control) {
      res.json({
        result: false,
        error: 'not_found'
      });
      return;
    }
    if (!user.status) {
      res.json({
        result: false,
        error: 'ban'
      });
      return;
    }

    const token = jwt.sign({
      userId: user.userId,
      status: user.status
    }, req.app.get('api_secret_key'), {
      expiresIn: 1408261000
    });

    res.json({
      result: true,
      token,
      user
    });

  } catch (err) {
    res.status(500);
    res.json('');
  }
});

// -------- REGISTER. -------- //
router.post("/register", async (req, res) => {

});


// -------- TOKEN CONTROL -------- //
router.post("/token-control", async (req, res) => {

});

module.exports = router;

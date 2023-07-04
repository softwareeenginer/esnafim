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
  const { email, password,type } = req.body;

  try {
    bcrypt.hash(password, 10).then(async (hash) => {
      const user = {
        email,
        password: hash,
        image: "https://e7.pngegg.com/pngimages/426/859/png-clipart-computer-icons-user-membership-black-area.png",
        name: "User",
        surname: Math.floor(Math.random() * 99999)
      };

      let c_user = await Users.findOne({ where: { email: email } });
      if (c_user) {
        res.json({
          result: false,
          error: 'already'
        });
        return;
      }

      const promise = Users.create(user);

      promise.then((user) => {

        const token = jwt.sign({ userId: user.userId, status: user.status }, req.app.get('api_secret_key'), {
          expiresIn: 1408261000
        });


        res.json({
          result: true,
          token
        });


      }).catch((err) => {
        res.json(err);
      });
    });
  } catch (err) {
    res.status(500);
    res.json('');
  }
});


// -------- TOKEN CONTROL -------- //
router.post("/token-control", async (req, res) => {
  const { token } = req.body;
  if (token) {
    jwt.verify(token, req.app.get("api_secret_key"), function (err, decoded) {
      if (decoded.status == 1) {
        res.json({
          result: true
        })
      } else {
        res.json({
          result: false
        })
      }
    });
  } else {
    res.json({
      result: false
    })
  }
});

module.exports = router;

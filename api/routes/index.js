const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();

const {
  Users,
  Citys,
  Districts,
  Neighborhoods,
  Adress,
} = require("../helper/db");

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
      attributes: ["userId", "password", "status", "type"],
    });

    if (!user) {
      res.json({
        result: false,
        error: "not_found",
      });
      return;
    }

    let pass_control = await bcrypt.compare(password, user.password);
    if (!pass_control) {
      res.json({
        result: false,
        error: "not_found",
      });
      return;
    }
    if (!user.status) {
      res.json({
        result: false,
        error: "ban",
      });
      return;
    }

    const token = jwt.sign(
      {
        userId: user.userId,
        status: user.status,
      },
      req.app.get("api_secret_key"),
      {
        expiresIn: 1408261000,
      }
    );

    res.json({
      result: true,
      token,
      user,
    });
  } catch (err) {
    res.status(500);
    res.json("");
  }
});

router.post("/location", async (req, res) => {
  const { status, code } = req.body;
  console.log(code);

  if (status == 1) {
    const districts = await Districts.findAll({
      where: { ilce_sehirkey: code },
    });

    res.json({
      result: true,
      districts,
    });
    try {
    } catch (e) {
      res.status(500);
      res.json("");
    }
  } else if (status == 2) {
    const neighborhoods = await Neighborhoods.findAll({
      where: { mahalle_ilcekey: code },
    });

    res.json({
      result: true,
      neighborhoods,
    });
    try {
    } catch (e) {
      res.status(500);
      res.json("");
    }
  } else {
    try {
      const citys = await Citys.findAll();

      res.json({
        result: true,
        citys,
      });
    } catch (err) {
      res.status(500);
      res.json("");
    }
  }
});

// -------- REGISTER. -------- //
router.post("/register", async (req, res) => {
  const { name, surname, email, password, code, type } = req.body;

  try {
    const neighborhoods = await Neighborhoods.findOne({
      where: { mahalle_key: code },
    });

    const address = await Adress.findOne({
      where: { mahalleId: neighborhoods.mahalleId },
    });

    if (!address) {
      const new_address = await Adress.create({
        mahalleId: neighborhoods.mahalleId,
      });

      bcrypt.hash(password, 10).then(async (hash) => {
        const user = {
          name,
          surname,
          email,
          password: hash,
          image:
            "https://e7.pngegg.com/pngimages/426/859/png-clipart-computer-icons-user-membership-black-area.png",
          type,
          adressId: new_address.adressId,
        };

        let c_user = await Users.findOne({ where: { email: email } });
        if (c_user) {
          res.json({
            result: false,
            error: "already",
          });
          return;
        }

        const promise = Users.create(user);

        promise
          .then((user) => {
            const token = jwt.sign(
              { userId: user.userId, status: user.status },
              req.app.get("api_secret_key"),
              {
                expiresIn: 1408261000,
              }
            );

            res.json({
              result: true,
              token,
            });
          })
          .catch((err) => {
            res.json(err);
          });
      });
    } else {
      bcrypt.hash(password, 10).then(async (hash) => {
        const user = {
          name,
          surname,
          email,
          password: hash,
          image:
            "https://e7.pngegg.com/pngimages/426/859/png-clipart-computer-icons-user-membership-black-area.png",
          type,
          adressId: address.adressId,
        };

        let c_user = await Users.findOne({ where: { email: email } });
        if (c_user) {
          res.json({
            result: false,
            error: "already",
          });
          return;
        }

        const promise = Users.create(user);

        promise
          .then((user) => {
            const token = jwt.sign(
              { userId: user.userId, status: user.status },
              req.app.get("api_secret_key"),
              {
                expiresIn: 1408261000,
              }
            );

            res.json({
              result: true,
              token,
            });
          })
          .catch((err) => {
            res.json(err);
          });
      });
    }
    // name, surname, email, password, adresId, type, image
  } catch (err) {
    res.status(500);
    res.json("");
  }
});

// -------- TOKEN CONTROL -------- //
router.post("/token-control", async (req, res) => {
  const { token } = req.body;
  if (token) {
    jwt.verify(token, req.app.get("api_secret_key"), function (err, decoded) {
      if (decoded.status == 1) {
        res.json({
          result: true,
        });
      } else {
        res.json({
          result: false,
        });
      }
    });
  } else {
    res.json({
      result: false,
    });
  }
});

module.exports = router;

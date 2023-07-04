const express = require("express");
const router = express.Router();
const upload = require("../helper/upload");
const {
  Users,
  Markets,
  Follows,
  Products,
  Notifications,
} = require("../helper/db");
const bcrypt = require("bcryptjs");
const config = require("../config");

router.post("/get", async (req, res) => {
  const { userId } = req.decoded;

  try {
    const notifications = await Notifications.findAll({
      where: {
        userId,
      },
    });


    res.json({
      result: true,
      notifications,
    });
  } catch (e) {
    res.json({
      error: e,
    });
  }
});

module.exports = router;

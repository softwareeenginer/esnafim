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

router.post("/get-one", async (req, res) => {
  const { userId } = req.decoded;
  const { notificationId } = req.body;
  console.log(notificationId);

  try {
    const notification = await Notifications.findOne({
      where: {
        bildirimId: notificationId,
      },
    });

    console.log(notification);
    if (notification) {
      await notification.update({
        statu: 0,
      });
    }

    res.json({
      result: true,
    });
  } catch (e) {
    res.json({
      error: e,
    });
  }
});

router.post("/get-count", async (req, res) => {
  const { userId } = req.decoded;

  try {
    const notifications = await Notifications.count({
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

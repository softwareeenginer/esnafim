const express = require("express");
const router = express.Router();

const { Users } = require("../helper/db");

router.post("/get", async (req, res) => {
  const { userId } = req.decoded;

  try {
    const info = await Users.findOne({
      where: {
        userId,
      },
      attributes: ["name", "surname", "email", "image"],
    });

    res.json({
      result: true,
      info,
    });
  } catch (e) {
    res.json({
      error: e,
    });
  }
});

module.exports = router;

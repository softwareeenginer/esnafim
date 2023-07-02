const express = require("express");
const router = express.Router();

const { Markets, Follows, Adress, Users } = require("../helper/db");

// www.localhost.com/api/follow/(bu sayfadaki işlemler)

router.post("/get", async (req, res) => {
  const { userId } = req.decoded;

  try {
    let follows = await Follows.findAll({
      where: { userId,status:1 },
    });

    let markets = [];

    for (let i = 0; i < follows.length; i++) {
      const market = await Markets.findAll({
        where: { marketId: follows[i].marketId },
      });
      for (let j = 0; j < market.length; j++) {
        markets.push(market[j]);
      }
    }

    res.json({
      result: true,
      markets: markets,
    });
  } catch (e) {
    console.log(e);
    res.json({
      result: false,
    });
  }
});

router.post("/set/update", async (req, res) => {
  const { userId } = req.decoded;
  const { marketId } = req.body;
  console.log(userId, marketId);
  try {
    const result = await Follows.findOne({
      where: { userId, marketId },
    });

    if (!result) {
      await Follows.create({
        userId,
        marketId,
        status: 1,
      });
    } else {
      if (result.status) {
        await Follows.update(
          {
            status: 0,
          },
          { where: { userId, marketId } }
        );
      } else {
        await Follows.update(
          {
            status: 1,
          },
          { where: { userId, marketId } }
        );
      }
    }

    res.json({
      result: true,
      status: !result.status,
    });
  } catch (e) {
    console.log(e);
    res.json({
      result: false,
    });
  }
});

module.exports = router;

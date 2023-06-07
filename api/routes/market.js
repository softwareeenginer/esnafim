const express = require("express");
const router = express.Router();

const { Markets, Follows, Users } = require("../helper/db");

// www.localhost.com/api/market/(bu sayfadaki işlemler)

router.post("/get", async (req, res) => {
  const { userId } = req.body;
  // const ayse = req.body.userId;
  try {
    let markets = await Markets.findAll({
      where: { status: 1 },
    });

    for (let i = 0; i < markets.length; i++) {
      const follows = await Follows.count({
        where: { marketId: markets[i].marketId },
      });
      markets[i] = { ...markets[i].dataValues, follows };
    }

    res.json({
      result: true,
      markets:markets
    });
  } catch (e) {
    console.log(e);
    res.json({
      result: false,
    });
  }
});

module.exports = router;

/*
const degisken = {
    userId:1
}

const a = degisken.userId;

const {userId} = degisken;
*/

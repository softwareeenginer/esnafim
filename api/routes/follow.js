const express = require("express");
const router = express.Router();

const {
  Markets,
  Follows,
  Adress,
  Users,
} = require("../helper/db");

// www.localhost.com/api/follow/(bu sayfadaki işlemler)

router.post("/get", async (req, res) => {
  const { userId } = req.decoded;
 
  try {
    let follows = await Follows.findAll({
      where: { userId: userId },
    });

    let markets =[];
   
    for (let i = 0; i < follows.length; i++) {
      const market = await Markets.findAll({
        where: { marketId: follows[i].marketId },
      });
      for (let j = 0; j < market.length; j++) {
        markets.push(market[j]);
      }
    }
   
    console.log(markets);

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

module.exports = router;

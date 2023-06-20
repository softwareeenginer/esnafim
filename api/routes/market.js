const express = require("express");
const router = express.Router();

const {
  Markets,
  Follows,
  Adress,
  Users,
  Districts,
  Citys,
  Neighborhoods,
  Products
} = require("../helper/db");

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
      const product = await Products.count({
        where: { marketId: markets[i].marketId },
      });

      const user_ = await Users.findOne({
        where: { userId: markets[i].userId },
      });

      const adress_ = await Adress.findOne({
        where: { adressId: user_.adressId },
      });

      const city = await Citys.findOne({
        where: { sehirId: adress_.sehirId },
      });

      const district = await Districts.findOne({
        where: {
          ilceId: adress_.ilceId,
        },
      });

      const neighborhood = await Neighborhoods.findOne({
        wher: {
          mahalleId: adress_.mahalleId,
        },
      });

      const address = city.name + " " + district.name + " " + neighborhood.name;
     
      markets[i] = { ...markets[i].dataValues, follows, address,product };
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

module.exports = router;

/*
const degisken = {
    userId:1
}

const a = degisken.userId;

const {userId} = degisken;
*/

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
  Products,
} = require("../helper/db");

// www.localhost.com/api/market/(bu sayfadaki işlemler)

router.post("/get", async (req, res) => {
  const { userId } = req.decoded;
  // const ayse = req.body.userId;
  try {
    let markets = await Markets.findAll({
      where: { status: 1 },
    });

    for (let i = 0; i < markets.length; i++) {
      const follow = await Follows.findOne({
        where: { userId, marketId: markets[i].marketId },
      });

      const follows = await Follows.count({
        where: { marketId: markets[i].marketId },
      });
      const product = await Products.count({
        where: { marketId: markets[i].marketId },
      });

      const products = await Products.findAll({
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

      markets[i] = {
        ...markets[i].dataValues,
        follows,
        address,
        product,
        products,
        follow,
      };
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

router.post("/get-one", async (req, res) => {
  const { userId } = req.decoded;
  const { marketId } = req.body;
  // const ayse = req.body.userId;
  try {
    let market = await Markets.findOne({ where: { marketId } });

    const follow = await Follows.findOne({
      where: { userId, marketId: market.marketId },
    });

    const products = await Products.findAll({
      where: { marketId: market.marketId },
    });

    res.json({
      result: true,
      market,
      products,
      follow,
    });
  } catch (e) {
    console.log(e);
    res.json({
      result: false,
    });
  }
});

router.post("/get-one/detail", async (req, res) => {
  const { marketId } = req.body;
  const { urunId } = req.body;
  // const ayse = req.body.userId;
  try {
    let urun = await Products.findOne({ where: { urunId } });
    let market = await Markets.findOne({ where: { marketId: urun.marketId } });
    const products = await Products.findAll({
      where: { marketId: marketId },
    });
    res.json({
      result: true,
      urun,
      products,
      market,
    });
  } catch (e) {
    console.log(e);
    res.json({
      result: false,
    });
  }
});

router.post("/get/location", async (req, res) => {
  const { userId } = req.decoded;
  try {
    let user = await Users.findOne({ where: { userId: userId } });
    let adress = await Adress.findOne({ where: { adressId: user.adressId } });

    let mahalle = await Neighborhoods.findOne({
      where: { mahalleId: adress.mahalleId },
    });
    const adressler = await Adress.findOne({
      where: { mahalleId: mahalle.mahalleId },
    });
    console.log("mahalle : ", adressler.adressId);

    const users = await Users.findAll({
      where: { adressId: adressler.adressId },
    });
    let markets = [];
    for (let i = 0; i < users.length; i++) {
      const marketler = await Markets.findAll({
        where: { userId: users[i].userId },
      });
      for (let j = 0; j < marketler.length; j++) {
        markets.push(marketler[j]);
      }
    }

    let products = [];
    for (let b = 0; b < markets.length; b++) {
      const product = await Products.findAll({
        where: { marketId: markets[b].marketId },
        order: [["createdAt", "desc"]],
      });

      for (let z = 0; z < product.length; z++) {
        products.push(product[z]);
      }
    }

    res.json({
      result: true,
      markets,
      products,
      mahalle,
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

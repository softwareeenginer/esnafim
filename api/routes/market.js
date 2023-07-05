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

      const neighborhood = await Neighborhoods.findOne({
        where: {
          mahalleId: adress_.mahalleId,
        },
      });
      const address = neighborhood.name;

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
    //kullanıcının adresi
    let adress = await Adress.findOne({ where: { adressId: user.adressId } });
    console.log(adress);

    //kullanıcının mahallesi
    let mahalle = await Neighborhoods.findOne({
      where: { mahalleId: adress.mahalleId },
    });
    console.log(mahalle);
    //kullanıcının mahallesi ile aynı mahallesi olan adresler
    const adressler = await Adress.findOne({
      where: { mahalleId: mahalle.mahalleId },
    });
    // console.log("mahalle : ", adressler.adressId);

    // market sahipleri
    const users = await Users.findAll({
      where: { adressId: adressler.adressId },
    });

    let markets = [];

    let products = [];

    for (let i = 0; i < users.length; i++) {
      const marketler = await Markets.findOne({
        where: { userId: users[i]?.userId },
      });

      if (!marketler) {
        return res.json({
          result: true,
          markets: [],
          products: [],
          mahalle: {},
        });
      }

      const follow = await Follows.findOne({
        where: { marketId: marketler?.marketId },
      });
      markets[i] = {
        marketler,
        follow,
      };

      const product_ = await Products.findAll({
        where: { marketId: marketler.marketId, status: 1 },
        order: [["createdAt", "desc"]],
      });
      for (let c = 0; c < product_.length; c++) {
        products.push(product_[c]);
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

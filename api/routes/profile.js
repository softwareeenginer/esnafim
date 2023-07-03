const express = require("express");
const router = express.Router();

const { Users, Markets, Follows, Products } = require("../helper/db");

router.post("/get", async (req, res) => {
  const { userId } = req.decoded;

  try {
    const info = await Users.findOne({
      where: {
        userId,
      },
    });
    const type = info.type;
    let myMarket = {};
    let followsCount;
    let productsCount;
    if (type == 1) {
      let market = await Markets.findOne({ where: { userId } });
      myMarket = market;
      const follows = await Follows.count({
        where: { marketId: market.marketId },
      });
      followsCount = follows;
      const product = await Products.count({
        where: { marketId: market.marketId },
      });
      productsCount = product;

      console.log(product);
    } else {
      console.log("Alıcı Kullanıcı");
    }

    const products = await Products.findAll({
      where: { marketId: myMarket.marketId },
    });

    res.json({
      result: true,
      info,
      myMarket,
      followsCount,
      productsCount,
      products,
    });
  } catch (e) {
    res.json({
      error: e,
    });
  }
});

router.post("/get/product", async (req, res) => {
  const { userId } = req.decoded;
  const { urunId } = req.body;

  try {
    let urun = await Products.findOne({ where: { urunId } });

    res.json({
      result: true,
      urun,
    });
  } catch (e) {
    res.json({
      error: e,
    });
  }
});
router.post("/get/product-edit", async (req, res) => {
  const { userId } = req.decoded;
  const { urunId } = req.body;
  const { price } = req.body;
  const { name } = req.body;
  const { description } = req.body;

  console.log(name);
  try {
    let urun = await Products.findOne({ where: { urunId } });

    if (name) {
      await Products.update(
        {
          name: name,
        },
        { where: { urunId } }
      );
    }

    if (price) {
      await Products.update(
        {
          price: price,
        },
        { where: { urunId } }
      );
    }
    if (description) {
      await Products.update(
        {
          description: description,
        },
        { where: { urunId } }
      );
    } else {
      console.log("hata");
    }
    console.log(urun.name);
    res.json({
      result: true,
    
    });
  } catch (e) {
    res.json({
      error: e,
    });
  }
});

module.exports = router;

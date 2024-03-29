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
      if (!myMarket) {
        const marketim = {
          name: info.name,
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1CVnfFmF0FbLuS8jbgjgs1dE3HVwINFmzOw&usqp=CAU",
          userId: info.userId,
        };
        await Markets.create(marketim);
      }

      const follows = await Follows.count({
        where: { marketId: market.marketId },
      });
      followsCount = follows;
      const product = await Products.count({
        where: { marketId: market.marketId },
      });
      productsCount = product;

      const products = await Products.findAll({
        where: { marketId: myMarket.marketId, status: 1 },
      });

      res.json({
        result: true,
        info,
        myMarket,
        followsCount,
        productsCount,
        products,
      });
    } else {
      console.log("Alıcı Kullanıcı");
      res.json({
        result: true,
        info,
      });
    }
  } catch (e) {
    res.json({
      error: e,
    });
  }
});

router.post("/set-image", upload.single("image"), async (req, res) => {
  console.log("girdi");
  console.log(req.file);
  const { userId } = req.decoded;

  try {
    const image = config.base_url + req?.file?.path;
    await Users.update(
      {
        image,
      },
      {
        where: { userId: userId },
      }
    );
    res.json({
      result: true,
    });
  } catch (e) {
    console.error(e);
    res.json({
      result: false,
      msg: e.message,
    });
  }
});

router.post("/get/edit", async (req, res) => {
  const { userId } = req.decoded;
  const { name } = req.body;
  const { surname } = req.body;
  const { email } = req.body;
  const { password } = req.body;

  try {
    let user = await Users.findOne({ where: { userId } });

    if (name) {
      await Users.update(
        {
          name: name,
        },
        { where: { userId } }
      );
    }

    if (surname) {
      await Users.update(
        {
          surname: surname,
        },
        { where: { userId } }
      );
    }
    if (email) {
      await Users.update(
        {
          email: email,
        },
        { where: { userId } }
      );
    }
    if (password) {
      const pass = await bcrypt.hash(password, 10);
      await Users.update(
        {
          password: pass,
        },
        { where: { userId } }
      );
    } else {
      console.log("hata");
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
router.post("/get/market-edit", async (req, res) => {
  const { name } = req.body;
  const { marketId } = req.body;

  try {
    let market = await Markets.findOne({ where: { marketId } });

    if (name) {
      await Markets.update(
        {
          name: name,
        },
        { where: { marketId } }
      );
    } else {
      console.log("hata");
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
    res.json({
      result: true,
    });
  } catch (e) {
    res.json({
      error: e,
    });
  }
});

router.post("/get/product-add", async (req, res) => {
  const { userId } = req.decoded;
  const { price } = req.body;
  const { priceDisc } = req.body;
  const { name } = req.body;
  const { description } = req.body;
  const { howMany } = req.body;
  const { isNotification, isDiscount } = req.body;

  const market = await Markets.findOne({
    where: { userId },
  });
  const marketId = market.marketId;
  const takipci = await Follows.findAll({
    where: { marketId },
  });
  try {
    const market = await Markets.findOne({
      where: { userId },
    });
    const marketId = market.marketId;
    if ((price, name, description)) {
      const product = {
        name,
        price,
        description,
        marketId,
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzrbxzUBMj9JKGOhHv8asgj7yP3gidrfCpUw&usqp=CAU",

        howMany,
        status: 1,
        priceDiscount:priceDisc
      };
      await Products.create(product);
      if (isNotification) {
        for (let i = 0; i < takipci.length; i++) {
          const notifi = {
            name: market.name,
            marketId: marketId,
            userId: takipci[i].userId,
            product: name,
            priceProduct: price,
            priceDiscount: isDiscount == true ? priceDisc : "NULL",
          };
          await Notifications.create(notifi);
        }
      } else {
        console.log("Bildirim gönderimi olmayacak");
      }
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

router.post("/get/product-delete", async (req, res) => {
  const { userId } = req.decoded;
  const { urunId } = req.body;
  try {
    const product = await Products.findOne({
      where: { urunId },
    });
    if (product) {
      await Products.update(
        {
          status: 0,
        },
        { where: { urunId } }
      );
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

module.exports = router;

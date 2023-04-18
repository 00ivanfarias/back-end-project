import express from "express";
import CartManager from "../services/CartManager.js";

const cManager = new CartManager("/carts.json");
const router = express.Router();

//POST
router.post("/", async (req, res) => {
  const cart = await cManager.createCart();

  try {
    res.send(cart);
  } catch (err) {
    res.send({ status: err, info: `${err.message}` });
  }
});

//GET
router.get("/:cid", async (req, res) => {
  const cid = Number.parseInt(req.params.cid);

  const cart = await cManager.getCartById(cid);

  try {
    if (cart) {
      res.send({
        status: "success",
        info: cart,
      });
    }
  } catch (err) {
    res.send({
      status: err,
      info: `Not match. The id is #${cart}.`,
    });
  }
});

//POST
router.post("/:cid/products/:pid", async (req, res) => {
  const addProd = await cManager.addProductToCartById(
    req.params.cid,
    req.params.pid,
    req.body.quantity
  );

  if (addProd) {
    res.send({
      status: "success",
      msg: `${req.body.quantity} product #${req.params.pid}, added to ${req.params.cid}`,
    });
  } else {
    res.send({ status: "error", msg: "PROBLEM ADDING PRODUCT" });
  }
});

export default router;

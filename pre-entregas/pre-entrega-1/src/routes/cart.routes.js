import { Router } from "express";
import CartManager from "../services/CartManager.js";

const cManager = new CartManager("/carts.json");
const router = Router();

//CREATE-CART
router.post("/", async (req, res) => {
  try {
    await cManager.createCart();
    res.send({ status: "success", inf: ".:cart was created successfuly." });
  } catch {
    res.send({ status: "error", inf: ".:problem when creating cart." });
  }
});

//LIST-PRODUCT-IN-CART(ID)
router.get("/:cid", async (req, res) => {
  const cart = await cManager.getCartById(Number(req.params.cid));

  if (cart) {
    res.send({ status: "success", info: cart });
  } else {
    res.send({
      status: "error",
      inf: ".: problem matching cart or cart does not exists.",
    });
  }
});

//ADD-PRODUCT-ON- CART >> PRODUCTS
router.post("/:cid/product/:pid", async (req, res) => {});

export default router;

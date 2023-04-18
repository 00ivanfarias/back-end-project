import express from "express";
import ProductManager from "../services/ProductManager.js";

const router = express.Router();
const pManager = new ProductManager("/productos.json");
const products = await pManager.getProducts();

router.get("/home", async (req, res) => {
  res.render("home", { products: await pManager.getProducts() });
});

router.get("/realtimeproducts", async (req, res) => {
  res.render("realTimeProducts", { products: await pManager.getProducts() });
});

// router.post("/realtimeproducts", (req, res) => {
//   console.log(req.body);
// });

export default router;

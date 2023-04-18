import express from "express";
import ProductManager from "./ProductManager.js";

const app = express();
const PORT = 8080;
const pManager = new ProductManager("/products.json");

// listening
app.listen(PORT, () => {
  console.log(`.:Interface running on 8080 port`);
});

//middleware
app.use(express.urlencoded({ extended: true }));

app.get("/products", async (req, res) => {
  const allProducts = await pManager.getProducts();

  if (req.query.limit) {
    res.send(allProducts.slice(0, req.query.limit));
  } else {
    res.send(allProducts);
  }
});

app.get("/product/:pid", async (req, res) => {
  const product = await pManager.getProductById(
    Number.parseInt(req.params.pid)
  );
  console.log(`Trying to match ${product}`);

  if (product) {
    res.send(product);
  } else {
    console.log({ error: `.:Query not resolved. The ID is ${product}.` });
  }
});

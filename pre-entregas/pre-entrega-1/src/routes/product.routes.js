import { Router } from "express";
import ProductManager from "../services/ProductManager.js";

const router = Router();
const pManager = new ProductManager("/productos.json");

//GET-ALL
router.get("/", async (req, res) => {
  const allProducts = await pManager.getProducts();

  if (req.query.limit) {
    res.send(allProducts.slice(0, req.query.limit));
  } else {
    res.send(allProducts);
  }
});

//GET-BY-ID
router.get("/:pid", async (req, res) => {
  const product = await pManager.getProductById(
    Number.parseInt(req.params.pid)
  );
  console.log(`.: TRYING TO MATCH ${product}`);

  if (product) {
    res.send(product);
  } else {
    console.log({ error: `.: QUERY NOT RESOLVED. THE ID IS #${product}.` });
  }
});

//POST
router.post("/", async (req, res) => {
  let product = await pManager.addProduct(req.body);

  if (product) {
    res.send({
      status: "success",
      info: `Product #${product.PID} created successfully.`,
    });
  } else {
    console.log("Invalid product");
    console.log(product);
    res
      .status(400)
      .send({ status: "error", info: "Invalid load, check product entries." });
  }
});

//PUT
router.put("/:pid", async (req, res) => {
  const pid = parseInt(req.params.pid);
  const newData = req.body;

  const productUpdated = await pManager.updateProductById(pid, newData);

  if ({ productUpdated }) {
    res.send({
      status: "success",
      info: `Product #${req.params.pid} updated succesfully`,
    });
  } else {
    res.send({
      status: "error",
      info: ` Problem updating product #${req.params.pid}. Try again.`,
    });
  }
});

//DELETE
router.delete("/:pid", async (req, res) => {
  const pid = parseInt(req.params.pid);

  pManager.deleteProductById(pid);
  res.send(`Product ${pid} successfully deleted.`);
});

export default router;

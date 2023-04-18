import express from "express";
import productsRouter from "./routes/product.routes.js";
import cartsRouter from "./routes/cart.routes.js";

const app = express();
const PORT = 8081;

//MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//ROUTES
//product route
app.use("/api/products", productsRouter);

//cart route
app.use("/api/carts", cartsRouter);

//LISTENER
app.listen(PORT, () => {
  console.log(`.: SERVER RUNNING ON PORT #${PORT}:.`);
});

import express from "express";
import __dirname from "./utils.js";
import handlebars from "express-handlebars";
import viewsRouter from "./routes/views.routes.js";
import productsRouter from "./routes/product.routes.js";
import cartsRouter from "./routes/cart.routes.js";
import { Server } from "socket.io";

//SET-UP & LISTENING
const app = express();
const PORT = 9090;

const httpServer = app.listen(PORT, () =>
  console.log(`.:running on port #${PORT}.`)
);

//BODY-PARSER
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//HBS CONFIG
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

//STATIC & PUBLICS
app.use(express.static(__dirname + "/public"));

//ROUTERS
//products
app.use("/api/products", productsRouter);

//carts
app.use("/api/carts", cartsRouter);

//HBS Router
app.use("/", viewsRouter);

// SERVICES
import ProductManager from "./services/ProductManager.js";
const pManager = new ProductManager("/productos.json");

//404 Handler
app.use((req, res, next) => {
  res.status(404).send("404 Not Foud");
});

//SERVER-ON-SOCKETS
const socketServer = new Server(httpServer);

//SERVER-ON-SOCKETS = ON / HANDSHAKE
socketServer.on("connection", (socket) => {
  console.log(`.:Server detected new connection. Client #${socket.id}`);

  socket.on("productAdd", async (data) => {
    const newProduct = await pManager.addProduct(data);
    if (newProduct) {
      socket.emit("productUpdate", newProduct);
    }
  });
});

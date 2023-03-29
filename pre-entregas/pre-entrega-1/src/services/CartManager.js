import fs from "fs";

export default class CartManager {
  static globalId = 0;

  constructor(filename) {
    this.carts = [];
    this.path = "../files";
    this.filename = this.path + filename;
  }

  createCart = async () => {
    await fs.promises.mkdir(this.path, { recursive: true });
    const CID = CartManager.globalId++;
    const newCart = {
      CID,
      products: [],
    };
    this.carts.push(newCart);
    try {
      await fs.promises.writeFile(this.filename, JSON.stringify(this.carts));
      console.log(".:CART SUCCESSFULLY CREATED.");
      return newCart;
    } catch {
      return console.error(".:failed task createCard().");
    }
  };

  getCartById = async (id) => {
    let res = await fs.promises.readFile(this.filename);
    let resParsed = await JSON.parse(res);

    const filtered = resParsed.find((cart) => cart.CID == id);

    return filtered ? filtered : console.error(".:failed task getCartById()");
  };

  addProductToCart = async (CID, PID, quantity) => {};
}

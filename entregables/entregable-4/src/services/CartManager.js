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
    const cart = {
      CID,
      products: [],
    };

    this.carts.push(cart);

    try {
      await fs.promises.writeFile(this.filename, JSON.stringify(this.carts));

      console.log(".:CART ENLISTED SUCCESSFULLY.");

      return cart;
    } catch (error) {
      throw new Error(error);
    }
  };

  getCartById = async (id) => {
    let res = await fs.promises.readFile(this.filename);
    let resParse = await JSON.parse(res);

    const filtered = resParse.find((cart) => cart.CID === id);

    return filtered ? filtered : console.error(".: NO MATCH FOUND.");
  };

  addProductToCartById = async (CID, PID, quantity) => {
    let cartArray = await fs.promises.readFile(this.filename);
    let parsedArray = JSON.parse(cartArray);

    if (await this.getCartById(CID)) {
      const newArray = parsedArray.map((cart) => {
        if (cart.CID == CID) {
          const inCart = cart.products.some((item) => item.PID === PID);

          if (!inCart) {
            cart.products.push({ PID: PID, quantity });
          } else {
            {
              cart.products = cart.products.map((product) => {
                if (product.PID == PID) {
                  return { ...product, quantity: product.quantity + quantity };
                } else {
                  return product;
                }
              });
            }
          }
        }
        return cart;
      });

      await fs.promises.writeFile(this.filename, JSON.stringify(newArray));
      return CID, PID;
    } else {
      console.log("Cart not found");
    }
  };
}

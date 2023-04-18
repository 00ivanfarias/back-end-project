import fs from "fs";

export default class ProductManager {
  static globalId = 0;

  constructor(filename) {
    this.products = [];
    this.path = "../files";
    this.filename = this.path + filename;
  }

  addProduct = async ({
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnail,
  }) => {
    await fs.promises.mkdir(this.path, { recursive: true });

    if (
      !{ title, description, code, price, status, stock, category, thumbnail }
    ) {
      return { error: ".:MISSING PARAMETERS. TRY AGAIN." };
    } else if (this.products.find((prod) => prod.code === code)) {
      return {
        error: ".:INVALID PRODUCT CODE. THIS PRODUCT IS ALREADY ENLISTED.",
      };
    } else {
      const PID = ProductManager.globalId++;
      const product = {
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnail,
        PID,
      };
      this.products.push(product);

      await fs.promises.writeFile(this.filename, JSON.stringify(this.products));
      console.log(".:PRODUCT ENLISTED SUCCESSFULLY.");

      return product;
    }
  };

  getProducts = async () => {
    let res = await fs.promises.readFile(this.filename);
    let resParse = await JSON.parse(res);

    console.log(".:READING/LOADING FILE LIST...");

    return resParse;
  };

  getProductById = async (id) => {
    let res = await fs.promises.readFile(this.filename);
    let resParse = await JSON.parse(res);

    const filtered = resParse.find((product) => product.PID === id);

    return filtered ? filtered : console.log(".:NO MATCH FOUND");
  };

  updateProductById = async (id, newData) => {
    let res = await fs.promises.readFile(this.filename);
    let resParse = await JSON.parse(res);

    const filtered = resParse.find((product) => product.PID === id);

    if (filtered) {
      const newArray = resParse.map((item) => {
        return id == item.PID ? { ...item, ...newData } : item;
      });
      await fs.promises.writeFile(this.filename, JSON.stringify(newArray));
      console.log(".:PRODUCT UPDATED SUCCESSFULLY.");
    } else {
      console.log(`.:PRODUCT ${id}. DOES NOT EXISTS IN THE LIST. `);
    }
  };

  deleteProductById = async (id) => {
    let res = await fs.promises.readFile(this.filename);
    let resParse = await JSON.parse(res);

    const filtered = resParse.find((product) => product.PID === id);

    if (filtered) {
      const newArray = resParse.filter((item) => item.PID !== id);
      await fs.promises.writeFile(this.filename, JSON.stringify(newArray));
      console.log(".:PRODUCT SUCCESSFULLY DELETED.");
    } else {
      console.log(`.:PRODUCT ${id} DOES NOT EXISTS ON THE LIST.`);
    }
  };
}

const fs = require("fs");

class ProductManager {
  static globalId = 0;

  constructor(filename) {
    this.products = [];
    this.path = "./files";
    this.filename = this.path + filename;
  }

  addProduct = async (title, description, price, thumbnail, code, stock) => {
    await fs.promises.mkdir(this.path, { recursive: true });

    if (!(title, description, price, thumbnail, code, stock)) {
      return { error: "MISSING PARAMETERS. TRY AGAIN" };
    } else if (this.products.find((prod) => prod.code === code)) {
      return { error: "INVALID PRODUCT CODE.THIS PRODUCT IS ALREADY ENLISTED" };
    } else {
      const PID = ProductManager.globalId++;
      this.products.push({
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
        PID,
      });
      await fs.promises.writeFile(this.filename, JSON.stringify(this.products));
      console.log("PRODUCT ENLISTED SUCCESSFULLY");
    }
  };

  getProducts = async () => {
    let res = await fs.promises.readFile(this.filename);
    let resParse = await JSON.parse(res);

    console.log("READING FILE LIST...");

    return resParse;
  };

  getProducts = async () => {
    let res = await fs.promises.readFile(this.filename);
    let resParse = await JSON.parse(res);

    console.log("READING LIST...");

    return resParse;
  };

  getProductById = async (id) => {
    let res = await fs.promises.readFile(this.filename);
    let resParse = await JSON.parse(res);

    const filtered = resParse.find((product) => product.PID === id);

    return filtered ? console.log(filtered) : console.log("NO MATCH FOUND");
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
        console.log("PRODUCT UPDATED SUCCESSFULLY");
      } else {
        console.log(`PRODUCT ${id} DOES NOT EXISTS IN THE LIST `);
      }

  };

  deleteProductById = async (id) => {
    let res = await fs.promises.readFile(this.filename);
    let resParse = await JSON.parse(res);

    const filtered = resParse.find((product) => product.PID === id);

    if (filtered) {
      const newArray = resParse.filter((item) => item.PID !== id);
      await fs.promises.writeFile(this.filename, JSON.stringify(newArray));
      console.log("PRODUCT SUCCESSFULLY DELETED");
    } else {
      console.log(`PRODUCT ${id} DOES NOT EXISTS ON THE LIST`);
    }
  };

}

const pManager = new ProductManager("/products.json");

// pManager.addProduct("title","description",10,"noimage","abc123",20)
// pManager.addProduct("title2","description2",12,"noimage","def456",10)

//pManager.getProducts();

//pManager.getProductById(1)

// pManager.updateProductById(1, {title:"ModifiedTitle2",description:"ModifiedDescription2",price:12,thumbnail:"noimage",code:"def456",stock:10});

pManager.deleteProductById(1)
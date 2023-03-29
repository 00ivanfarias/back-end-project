import fs from 'fs'

export default class ProductManager {
  static globalId = 0;

  constructor(filename) {
    this.products = [];
    this.path = "../files";
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

    return filtered ? filtered : console.log("NO MATCH FOUND");
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

// pManager.addProduct("Product_1","Description_1",17,"no_image","aaa000",20);
// pManager.addProduct("Product_2","Description_2",12,"no_image","aab001",20);
// pManager.addProduct("Product_3","Description_3",5,"no_image","abb011",20);
// pManager.addProduct("Product_4","Description_4",8,"no_image","bbb111",20);

//pManager.getProducts();

pManager.getProductById(1)

// pManager.updateProductById(1, {title:"ModifiedTitle2",description:"ModifiedDescription2",price:12,thumbnail:"noimage",code:"def456",stock:10});

//pManager.deleteProductById(1)
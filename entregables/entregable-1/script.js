class productManager {
  constructor(title, description, price, thumbnail, code, stock, id) {
    this.products = [];
    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.code = code;
    this.stock = stock;
    this, (id = id);
  }

  addProduct(product) {
    for (const element of this.products) {
      if (
        product.stock < 0 ||
        product.price < 0 ||
        product.code === "" ||
        product.title === "" ||
        product.description === "" ||
        product.thumbnail === ""
      ) {
        return { error: " All the field are requiered. Try again. " };
      }
    }
    product.id = Math.random().toString(9);
    this.products.push(product);
    return this.products;
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    for (const element of this.products) {
      if (element.id === id) {
        return element.title;
      }
    }

    return { error: "Nothing was found." };
  }
}

//Test

productManager = new productManager();
// console.log("Empty List");
// console.log(productManager.getProducts());
console.log("Add Product");
console.log(
  productManager.addProduct({
    title: "sample product",
    description: "Sample description",
    price: 100,
    thumbnail: "No image",
    code: "nocode123",
    stock: 10,
  })
);
console.log("List with product");
console.log(productManager.getProducts());
console.log("Adding product with redundancy");
console.log(
  productManager.addProduct({
    title: "sample product",
    description: "Sample description",
    price: 100,
    thumbnail: "No image",
    code: "nocode123",
    stock: 10,
  })
);
// console.log("Adding product with an empty field")
// console.log(productManager.addProduct({title: '', description: 'Sample description', price: 100, thumbnail: "No image", code: "nocode123", stock: 10}));
// console.log("Search by ID")
// console.log(productManager.getProductById(productManager.products[0].id));
// console.log("Testing error ID")
// console.log(productManager.getProductById("000"));

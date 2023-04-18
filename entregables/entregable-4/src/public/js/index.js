//SOCKET CONFIG CLIENT
const socket = io();

const productsList = document.getElementById("products-list");

const createProduct = () => {
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const code = document.getElementById("code").value;
  const price = parseFloat(document.getElementById("price").value);
  const status = document.getElementById("status").value;
  const stock = parseInt(document.getElementById("stock").value);
  const category = document.getElementById("category").value;
  const thumbnails = document.getElementById("thumbnails").value;

  const product = {
    title: title,
    description: description,
    code: code,
    price: price,
    status: status,
    stock: stock,
    category: category,
    thumbnails: [],
  };

  return product;
};

const handleAdd = () => {
  const form = createProduct();
  if (
    !(form.title,
    form.description,
    form.code,
    form.price,
    form.status,
    form.stock,
    form.category,
    form.thumbnails)
  ) {
  } else {
    socket.emit("productAdd", form);
  }
};

socket.on("productUpdate", (product) => {
  console.log(product);
  const li = document.createElement("li");
  li.textContent = `${product.title} - $${product.price}`;
  productsList.appendChild(li);
});

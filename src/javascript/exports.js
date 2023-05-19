import classes from "./classes.js"

const ProductManager = new classes.ProductManager("./src/data/products.json")
const CartManager = new classes.CartManager("./src/data/carts.json")

export {ProductManager, CartManager}
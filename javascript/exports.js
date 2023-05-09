import classes from "./classes.js"

const ProductManager = new classes.ProductManager("./data/products.json")
const CartManager = new classes.CartManager("./data/carts.json")

export {ProductManager, CartManager}
import express from "express"
import Classes from "./classes.js"

const Manager = new Classes.ProductManager("./data/products.json")
const CartManager = new Classes.CartManager("./data/carts.json")

const SERVER = express()
const PORT = 8080
const ready = () => console.log("Server ready on port", PORT)

SERVER.use(express.urlencoded({extended:true}))

SERVER.listen(PORT, ready)
SERVER.get("/products", async (req, res) => {
    try {
        const getMessage = Manager.getProducts()
        if (getMessage.message != "success") return res.send({success: false})
        res.send({success: true, response: getMessage.products.slice(0, req.query.limit ?? getMessage.products.length)})
    } catch(err) {
        console.log("ERROR: '/api/products")
        console.log(err)
        res.send({success: false})
    }
})

SERVER.get("/products/:pid", async (req, res) => {
    try {
        const { pid } = req.params
        const productMessage = Manager.getProductById(pid)
        if (productMessage.message != "success") return res.send({success: false, error: "product doesn't exist"})
        res.send({success: true, response: productMessage.product})
    } catch(err) {
        console.log("ERROR: 'apí/products/:pid")
        console.log(err)
        res.send({success: false})
    }
})







SERVER.get("/carts", async (req, res) => {
    try {
        const getMessage = CartManager.getCarts()
        if (getMessage.message != "success") return res.send({success: false})
        res.send({success: true, response: getMessage.carts.slice(0, req.query.limit ?? getMessage.carts.length)})
    } catch(err) {
        console.log("ERROR: '/api/carts")
        console.log(err)
        res.send({success: false})
    }
})

SERVER.get("/carts/:cid", async (req, res) => {
    try {
        const { cid } = req.params
        const cartMessage = CartManager.getCartById(cid)
        if (cartMessage.message != "success") return res.send({success: false, error: "cart doesn't exist"})
        res.send({success: true, response: cartMessage.cart})
    } catch(err) {
        console.log("ERROR: 'api/carts/:cid")
        console.log(err)
        res.send({success: false})
    }
})
import { Router } from "express"
import { ProductManager, CartManager } from "../javascript/exports.js"

const router = Router()

//const CartManager = new Classes.CartManager("./data/carts.json")

router.get("/carts", async (req, res, next) => {
    try {
        const getMessage = CartManager.getCarts()
        if (getMessage.message != "success") return res.send({success: false})
        return res.send({success: true, response: getMessage.carts.slice(0, req.query.limit ?? getMessage.carts.length)})
    } catch(err) {
        console.log("ERROR: '/api/carts")
        console.log(err)
        next(err)
    }
})

router.get("/carts/:cid", async (req, res, next) => {
    try {
        const { cid } = req.params
        const cartMessage = CartManager.getCartById(cid)
        if (cartMessage.message != "success") return res.send({success: false, error: "cart doesn't exist"})
        return res.send({success: true, response: cartMessage.cart})
    } catch(err) {
        console.log("ERROR: 'api/carts/:cid")
        console.log(err)
        next(err)
    }
})

router.post("/carts", async (req, res, next) => {
    try {
        const addResponse = CartManager.addCart()
        if (addResponse.success) {
            return res.status(201).send({
                status: 201,
                response: addResponse.id
            })
        }

        return res.status(400).send({
            status: 400,
            response: addResponse.message
        })

    } catch(err) {
        console.log(err)
        next(err)
    }
})

router.patch("/carts/:cid/product/:pid/:units", async (req, res, next) => {
    try {
        const { cid, pid, units } = req.params
        const addResponse = CartManager.addProductToCart(cid, pid, units, { ProductManager, CartManager })


        if (addResponse.success) return res.status(200).send({
            status: 200,
            response: addResponse.response
        })

        return res.status(500).send({
            status: 500,
            response: addResponse.message
        })
    } catch (err) {
        console.log("ERROR")
        next(err)
        
    }
    
})

router.delete("/carts/:cid/product/:pid/:units", async (req, res, next) => {
    try {
        const { cid, pid, units } = req.params

        const deleteResponse = CartManager.removeProductFromCart(cid, pid, units, { ProductManager, CartManager })
        if (deleteResponse.success) return res.status(200).send({
            status: 200,
            response: deleteResponse.response
        })
        
        return res.status(500).send({
            status: 500,
            response: deleteResponse.message
        })

    } catch(err) {
        next(err)
    }
})

export default router
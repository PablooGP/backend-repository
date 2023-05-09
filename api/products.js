import { Router, response } from "express"
import { ProductManager, CartManager } from "../javascript/exports.js"

const router = Router()

//const Manager = new Classes.ProductManager("./data/products.json")

router.get("/products", async (req, res, next) => {
    try {
        const getMessage = ProductManager.getProducts()
        if (getMessage.message != "success") return res.send({success: false})
        return res.status(200).send({
            status: 200,
            response: getMessage.products.slice(0, req.query.limit ?? getMessage.products.length)
        })
    } catch(err) {
        console.log("ERROR: '/api/products")
        console.log(err)
        next(err)
    }
})

router.get("/products/:pid", async (req, res, next) => {
    try {
        const { pid } = req.params
        const productMessage = ProductManager.getProductById(pid)
        if (!productMessage.success) return res.send({success: false, error: "product doesn't exist"})
        return res.status(200).send({
            status: 200,
            response: productMessage.product
        })
    } catch(err) {
        console.log("ERROR: 'apí/products/:pid")
        console.log(err)
        res.send({success: false})
        next(err)
    }
})

router.post("/products", async (req, res, next) => {
    try {
        const {title, description, price, thumbnail, code} = req.headers

        if (title == undefined || description == undefined || price == undefined || thumbnail == undefined || code == undefined){
            return res.status(400).send({
                status: 400,
                response: "required variables were missing"
            })
        }

        const addResponse = ProductManager.addProduct(req.headers)
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

router.patch("/products/:pid", async (req, res, next) => {
    try {
        const { pid } = req.params
        const queryModifiers = req.query

        const updateResponse = ProductManager.updateProduct(pid, queryModifiers)

        if (updateResponse.success) {
            return res.status(200).send({
                status: 200,
                response: updateResponse.afterChanges
            }) 
        } 

        const code = updateResponse.message == "Not found" ? 404 : 500
        return response.status(code).send({
            status: code,
            response: updateResponse.message
        })

    } catch(err) {
        next(err)
    }
})

router.delete("/products/:pid", async (req, res, next) => {
    try {
        const { pid } = req.params
        const deleteResponse = ProductManager.deleteProduct(pid)

        if (deleteResponse.success) {
            return res.status(200).send({
                status: 200,
                response: deleteResponse.products
            })
        }

        return res.status(400).send({
            status: 400,
            response: deleteResponse.message
        })
    } catch (err) {
        next(err)
    }
})

export default router
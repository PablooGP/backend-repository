import { Router } from "express"
import { ProductManager, CartManager } from "../javascript/exports.js"
import { ConvertProduct } from "../javascript/devUtils.js"

const router = Router()

router.get('/', async (req, res, next) => {
    try {
        return res.render("index", {

            style: "/public/style.css",
            name: 'Nico',
            last_name: 'Lopez',
            photo: 'https://www.w3schools.com/howto/img_avatar.png',
            produtcs: [
                { title: 'Anteojos Ray-Ban Wayfarer 4195Mi', photo: 'public/img/1.jpg', price: '$15.000' },
                { title: 'Anteojos Ray-Ban Wayfarer 4195Mi', photo: 'public/img/2.jpg', price: '$20.000' },
                { title: 'Anteojos Ray-Ban Wayfarer 4195Mi', photo: 'public/img/3.jpg', price: '$23.000' }],
            title: 'index',
            script: '/public/conection.js'
        })
    } catch (error) {
        console.log(error)
        next(error)
    }
})

router.get('/products', async (req, res, next) => {
    try {
        return res.render('products', {
            title: "Products Page",
            style: "/public/style.css",
            scripts: [
                "/socket.io/socket.io.js",
                "/public/js/devfuncts.js",
                "/public/js/cartUpdate.js",
                "/public/js/viewProductsController.js"
            ]
        })

    } catch (error) {
        console.log(error)
        next(error)
    }
})

router.get('/products/:pid', async (req, res, next) => {
    try {
        const {pid} = req.params
        const p = ProductManager.getProductById(pid)
        if (!p.success) return res.render("internalError", { // esta pagina se usara para mostrar errores internos al cliente
            title: "ERROR PAGE",
            errorMessage: p.message
        })

        return res.render('viewProduct', {
            title: "Unique Product Page",
            style: "/public/style.css",
            scripts: [
                "/socket.io/socket.io.js",
                "/public/js/devfuncts.js",
                "/public/js/cartUpdate.js",
                "/public/js/viewUniqueProduct.js"
            ]
        })

    } catch (error) {
        console.log(error)
        next(error)
    }
})

router.get("/cart", async (req, res, next) => {
    try {
        return res.render("cart", {
            title: "Carrito de compras",
            script: "/public/js/viewCartController.js"
        })
    } catch(err) {

    }
})



export default router

import { Server } from "socket.io"
import httpServer from "./app.js"
import {ProductManager, CartManager} from "./src/javascript/exports.js"
import UpdaterManager from "./src/javascript/updaterManager.js"

const socketServer = new Server(httpServer)

UpdaterManager.AddProductUpdater((type, content) => {
    if (type == "FULL_UPDATE") {
        socketServer.emit("SERVER_ALLPRODUCTS_UPDATE_EVENT", content)
    } else if (type == "UNIQUE_UPDATE") {
        socketServer.emit("SERVER_UNIQUEPRODUCT_UPDATE_EVENT", content)
    }
})

socketServer.on("connection", socket => {

    console.log("cliente conectado")
    socket.on("getCartContent", (cid) => {
        try {
            const cartResponse = CartManager.getCartById(cid)
            if (cartResponse.success) {
                let i = 0
                cartResponse.cart.products.forEach(e => { i += e.x })
                socket.emit("cartUpdated", i)
            }
        } catch(err) {
            console.log(err)
        }
    })

    socket.on("disconnect", () => {
        console.log("el cliente se desconecto")
    })
})
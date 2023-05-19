import express from "express"
import * as dotenv from 'dotenv'
import router from "./src/api/index.js"
import error_handler from "./src/middlewares/errorHandler.js"
import notfound_handler from "./src/middlewares/notfoundHandler.js"

import views_router from "./src/javascript/views.js"

import { engine } from "express-handlebars"
import { __dirname } from './src/utils.js'

dotenv.config()

const server = express()
const PORT = process.env.SERVERPORT || 3000
const ready = () => console.log("Server ready on port", PORT)

server.engine("handlebars", engine())
server.set("views", __dirname+"/views")
server.set("view engine", "handlebars")

server.use("/public", express.static("public"))
server.use(express.json())
server.use(express.urlencoded({extended:true}))
server.use("/api", router)
server.use("/", views_router)
server.use(error_handler)
server.use(notfound_handler)

export default server.listen(PORT, ready)
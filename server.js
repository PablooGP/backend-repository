import express from "express"
import router from "./api/index.js"
import error_handler from "./middlewares/errorHandler.js"
import notfound_handler from "./middlewares/notfoundHandler.js"

const SERVER = express()
const PORT = 8080
const ready = () => console.log("Server ready on port", PORT)

SERVER.use(express.static("public"))

SERVER.use(express.json())
SERVER.use(express.urlencoded({extended:true}))
SERVER.use("/", router)
SERVER.use(error_handler)
SERVER.use(notfound_handler)

SERVER.listen(PORT, ready)

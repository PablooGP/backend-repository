import { Router } from "express"
import products_router from "./products.js"
import carts_router from "./carts.js"

const router = Router()

router.use("/", products_router)
router.use("/", carts_router)

export default router
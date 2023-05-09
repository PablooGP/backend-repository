import { Router } from "express"
import products_router from "./products.js"
import carts_router from "./carts.js"

const router = Router()

router.use("/api", products_router)
router.use("/api", carts_router)

export default router
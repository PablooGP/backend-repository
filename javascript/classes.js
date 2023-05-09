import fs, { existsSync } from "fs"

class Producto {
    constructor (data, id) {
        this.title = data.title
        this.description = data.description
        this.price = Number(data.price)
        this.thumbnail = data.thumbnail
        this.code = data.code
        this.stock = Number(data.stock ?? 0) // solo se puede editar mediante la addStock() y leerlo con la funcion getStock()
        this.updated = Date.now()
        //this.#path = data.path
        this.id = id
    }
}

class ProductManager {
    #products; // solo la clase va a poder manipular esto
    #id;
    #path;
    constructor(path) {
        this.#products = [];
        this.#id = 0;
        this.#path = path

        try {
            //fs.mkdirSync(this.#path)
            if (fs.existsSync(this.#path) ) {
                const jsonString = fs.readFileSync(this.#path, "utf-8")
                const parse = JSON.parse(jsonString)
                this.#id = parse.id
                this.#products = parse.products
            }
        } catch(err) {
            console.log("ERROR:", err)
            console.log(`ProductManager constructor: Error al leer el archivo: ${this.#path}`)
        }
        
    }

    addProduct = (data) => { // recibe un objeto.

        try {
            if (data.title == undefined || data.description == undefined || data.price == undefined || data.thumbnail == undefined || data.code == undefined) return console.error("ERROR: El metodo 'addProduct' necesita si o si de los valores: title, description, price, thumbnail, code, stock")

            const prod = this.#products.some(p => p.code == data.code);
            if (!prod) { // de no encontrar el producto se agregara al array
    
                this.#id++
                const prod = new Producto(data, this.#id)
                this.#products.push(prod)
                fs.writeFileSync(this.#path, JSON.stringify({id: this.#id, products: this.#products}, null, "\t"))
    
                return {success: true, message: "success", id: prod.id}
            } else {
                return {success: false, message: "addProduct: error"}
            }
        } catch(err) {

        }
        
    }

    getProducts = () => {
        try { // es la primera vez que uso esto espero q funcione bien

            if (!fs.existsSync(this.#path)) return { message: "success", products: this.#products }

            const jsonString = fs.readFileSync(this.#path, "utf-8")
            const array = JSON.parse(jsonString)

            if (array.products.length == 0) return { message: "Not found" }
            return { message: "success", products: array.products }
        } catch(err) {
            console.log("getProducts:", err)
            return { message: "getProducts: error" }
        }
    }

    getProductById = (id) => {
        try {
            const prod = this.#products.find(p => { return p.id == id });
            if (prod==undefined) return { message: "Not found" }
            return { success: true, message: "success", product: prod }
        } catch(err) {
            return { success: false, message: "getProductById: error" }
        }
        
    }

    updateProduct(id, data) {

        try {
            const res = this.getProductById(id)
            if (res.success!=true) return { message: "Not found" }

            const i = this.#products.findIndex(e => e.id == res.product.id)
            if (i==-1) return { success: false, message: "Not found" }
            
            const arrayCopy = {...this.#products[i]}

            for (const p in data) {
                if (p=="id") continue // al intentar modificar el 'id' seguira con el siguiente loop
                if (typeof this.#products[i][p] == "number") {
                    this.#products[i][p] = Number(data[p])
                    continue
                }
                this.#products[i][p] = data[p]
            }

            if (JSON.stringify(this.#products[i]) != JSON.stringify(arrayCopy)) { // si nota cambios en los json editara la variable "updated"
                this.#products[i].updated = Date.now()
                fs.writeFileSync(this.#path, JSON.stringify({id: this.#id, products: this.#products}, null, "\t"))
            }

            return { success: true, message: "updateProduct: done", beforeChanges: arrayCopy, afterChanges: this.#products[i]}
        } catch(err) {
            console.log(err)
            return { success: false, message: "updateProduct: error" }
        }
    }

    deleteProduct = (id) => {
        try {
            //const i = this.#products.findIndex(e => e.id == id)
            //if (i==-1) return { message: "Not found" }

            //const item = this.#products.splice(i, 1)
            const deleted = this.#products.filter(e => e.id == id)
            this.#products = this.#products.filter(e => e.id != id)
            fs.writeFileSync(this.#path, JSON.stringify({id: this.#id, products: this.#products}, null, "\t"))
            return { success: true, message: "deleteProduct: done", products: deleted}
        } catch(err) {
            console.log(err)
            return { success: false, message: "deleteProduct: error" }
        }
    }
}

class CartManager {
    #carts;
    #id;
    #path;
    constructor(path) {
        this.#carts = [];
        this.#id = 0;
        this.#path = path

        try {
            //fs.mkdirSync(this.#path)
            if (fs.existsSync(this.#path) ) {
                const jsonString = fs.readFileSync(this.#path, "utf-8")
                const parse = JSON.parse(jsonString)
                this.#id = parse.id
                this.#carts = parse.carts
            }
        } catch(err) {
            console.log("ERROR:", err)
            console.log(`CartManager constructor: Error al leer el archivo: ${this.#path}`)
        }
        
    }

    addCart = () => {
        try {
            this.#id++
            const newCart = {
                id: this.#id,
                products: [],
            }
            this.#carts.push(newCart)
            fs.writeFileSync(this.#path, JSON.stringify({id: this.#id, carts: this.#carts}, null, "\t"))
            return {success: true, message: "success", id: this.#id}
        } catch(err) {
            return {success: false, message: "addCart: error"}
        }
    }

    getCarts = () => {
        try {

            if (!fs.existsSync(this.#path)) return { message: "success", carts: this.#carts }

            const jsonString = fs.readFileSync(this.#path, "utf-8")
            const array = JSON.parse(jsonString)

            if (array.carts.length == 0) return { message: "Not found" }
            return { success: true, message: "success", carts: array.carts }
        } catch(err) {
            console.log("getCarts:", err)
            return { success: false, message: "getCarts: error" }
        }
    }

    getCartById = (id) => {
        try {
            const cart = this.#carts.find(e => e.id == id)
            if (!cart) return {message: "Not found"}
            return {success: true, message: "success", cart: cart}
        } catch {
            return {success: false, message: "getCartById: error"}
        }
    }

    addProductToCart = (cid, pid, amount, managers) => {
        try {
            
            if (amount <= 0) return {success: false, message: "invalid amount"}

            const productResponse = managers.ProductManager.getProductById(pid)
            const cartResponse = managers.CartManager.getCartById(cid)

            console.log(cartResponse)
            if (!productResponse.success) return {success: false, message: "the product does not exist"}
            if (!cartResponse.success) return {success: false, message: "the cart does not exist"}
            if (productResponse.product.stock < amount) return {success: false, message: "insufficient stock"}

            const updateResponse = managers.ProductManager.updateProduct(pid, {stock: productResponse.product.stock-amount}) // reserva stock
            if (!updateResponse.success) return {success: false, message: "could not reserve stock"}

            const find = cartResponse.cart.products.findIndex(e => e.pid == pid)

            if (find == -1){ // si se encontro el producto dentro del carrito
                cartResponse.cart.products.push({
                    pid: Number(pid),
                    x: Number(amount)
                })
            } else {
                cartResponse.cart.products[find].x += Number(amount)
            }

            const currentCartIndex = this.#carts.findIndex(e => e.id == cid)
            this.#carts[currentCartIndex].products = cartResponse.cart.products

            fs.writeFileSync(this.#path, JSON.stringify({id: this.#id, carts: this.#carts}, null, "\t"))
            return {success: true, message: "success", response: cartResponse.cart}
        } catch(err) {
            return {success: false, message: err}
        }
    }

    removeProductFromCart = (cid, pid, amount, managers) => {

        try {
            if (amount <= 0) return {success: false, message: "invalid amount"}

            const productResponse = managers.ProductManager.getProductById(pid)
            const cartResponse = managers.CartManager.getCartById(cid)
            if (!productResponse.success) return {success: false, message: "the product does not exist"}
            if (!cartResponse.success) return {success: false, message: "the cart does not exist"}
    
            const find = cartResponse.cart.products.findIndex(e => e.pid == pid)
            if (find == -1) return {success: false, message: "product not found in cart"}
            if (cartResponse.cart.products[find].x < amount) return {success: false, message: "insufficient stock to remove"}
    
            cartResponse.cart.products[find].x -= Number(amount)
    
            const currentCartIndex = this.#carts.findIndex(e => e.id == cid)
            if (currentCartIndex == -1) return {success: false, message: "product not in cart"}

            const result = cartResponse.cart.products.filter(e => e.x > 0)
            this.#carts[currentCartIndex].products = result
            fs.writeFileSync(this.#path, JSON.stringify({id: this.#id, carts: this.#carts}, null, "\t"))

            const updateResponse = managers.ProductManager.updateProduct(pid, {stock: productResponse.product.stock+Number(amount)}) // reserva stock
            if (!updateResponse.success) return {success: false, message: "could not add stock"}

            return {success: true, message: "success", response: result}
        } catch(err) {
            return {success: false, message: err}
        }
        

    }
}

export default {ProductManager: ProductManager, CartManager: CartManager}
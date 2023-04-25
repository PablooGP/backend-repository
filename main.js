const fs = require("fs")


class Producto {
    constructor (data, id) {
        this.title = data.title
        this.description = data.description
        this.price = data.price
        this.thumbnail = data.thumbnail
        this.code = data.code
        this.stock = data.stock ?? 0 // solo se puede editar mediante la addStock() y leerlo con la funcion getStock()
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
        } catch {
            console.log(`ProductManager constructor: Error al leer el archivo: ${this.#path}`)
        }
        
    }

    addProduct = (data) => { // recibe un objeto.

        if (data.title == undefined || data.description == undefined || data.price == undefined || data.thumbnail == undefined || data.code == undefined) return console.error("ERROR: El metodo 'addProduct' necesita si o si de los valores: title, description, price, thumbnail, code, stock")

        const prod = this.#products.some(p => p.code == data.code);
        if (!prod) { // de no encontrar el producto se agregara al array

            this.#id++
            const prod = new Producto(data, this.#id)
            this.#products.push(prod)
            fs.writeFileSync(this.#path, JSON.stringify({id: this.#id, products: this.#products}, null, "\t"))

            return {message: "success", id: prod.id}
        } else {
            return {message: "addProduct: error"}
        }
    }

    getProducts = () => {
        try { // es la primera vez que uso esto espero q funcione bien
            const jsonString = fs.readFileSync(this.#path, "utf-8")
            const array = JSON.parse(jsonString)

            if (array.length == 0) return { message: "Not found" }
            return { message: "success", products: array }
        } catch(err) {
            console.log("getProducts:", err)
            return { message: "getProducts: error" }
        }
    }

    getProductById = (id) => {
        try {
            const prod = this.#products.find(p => { return p.id == id });
            if (prod==undefined) return { message: "Not found" }
            return { message: "success", product: prod }
        } catch(err) {
            return { message: "getProductById: error" }
        }
        
    }

    updateProduct(id, data) {

        try {
            const res = this.getProductById(id)
            if (res.message!="success") return { message: "Not found" }

            const i = this.#products.findIndex(e => e.id == res.product.id)
            if (i==-1) return { message: "Not found" }
            
            const arrayCopy = {...this.#products[i]}

            for (const p in data) {
                if (p=="id") continue // al intentar modificar el 'id' seguira con el siguiente loop
                this.#products[i][p] = data[p]
            }

            if (JSON.stringify(this.#products[i]) != JSON.stringify(arrayCopy)) { // si nota cambios en los json editara la variable "updated"
                this.#products[i].updated = Date.now()
                fs.writeFileSync(this.#path, JSON.stringify({id: this.#id, products: this.#products}, null, "\t"))
            }

            return { message: "updateProduct: done", beforeChanges: arrayCopy, afterChanges: this.#products[i]}
        } catch(err) {
            console.log(err)
            return { message: "updateProduct: error" }
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
            return { message: "deleteProduct: done", products: deleted}
        } catch(err) {
            console.log(err)
            return { message: "deleteProduct: error" }
        }
    }
}
class Producto {
    #id
    #stock
    constructor (data, id) {
        this.title = data.title
        this.description = data.description
        this.price = data.price
        this.thumbnail = data.thumbnail
        this.code = data.code
        this.#stock = data.stock // solo se puede editar mediante la addStock() y leerlo con la funcion getStock()
        this.id = id
    }

    getStock = () => { return this.#stock }
    addStock(cantidad) {
        this.#stock += cantidad
    }
}

class ProductManager {
    #products; // solo la clase va a poder manipular esto
    #id;
    constructor() {
        this.#products = [];
        this.#id = 0;
    }

    addProduct = (Datos) => { // recibe un objeto.

        if (Datos.title == undefined || Datos.description == undefined || Datos.price == undefined || Datos.thumbnail == undefined || Datos.code == undefined || Datos.stock == undefined) return console.error("ERROR: El metodo 'addProduct' necesita si o si de los valores: title, description, price, thumbnail, code, stock")

        const producto = this.#products.some(p => p.code == Datos.code);
        if (!producto) { // de no encontrar el producto se agregara al array

            this.#id++
            const prod = new Producto(Datos, this.#id)

            this.#products.push(prod)

            return prod
        } else {
            console.error("ERROR: Ya hay otro producto con el mismo valor 'code'")
        }
    }

    getProducts = () => {
        return this.#products
    }

    getProductById = (id) => {
        const producto = this.#products.find(p => { return p.id == id });
        if (producto==undefined) return console.log("Not found")
        return producto
    }
}
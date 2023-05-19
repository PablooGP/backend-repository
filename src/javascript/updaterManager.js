class UpdaterManager {
    #productUpdaters = []
    #cartUpdaters = []
    constructor() {}
    AddProductUpdater = cb => { // Server.js debe llamar a esta funcion
        if (typeof cb != "function") return
        this.#productUpdaters.push(cb)
    }
    AddCartUpdater = cb => { // Server.js debe llamar a esta funcion
        if (typeof cb != "function") return
        this.#cartUpdaters.push(cb)
    }
    ProductUpdated(...data) { // ProductManager debe llamar a este metodo
        this.#productUpdaters.forEach(async f => f(...data) )
    }
    CartUpdated(...data) { // CartManager debe llamar a este metodo
        this.#cartUpdaters.forEach(async f => f(...data) )
    }
}

export default new UpdaterManager()
document.addEventListener("DOMContentLoaded", () => {
    const updatersArray = []
    const completeViewUpdate = async (data) => {
    
        while(updatersArray.length > 0) { updatersArray.pop() }
        
        const total_container = document.getElementById("productsContainer")
        if (total_container == undefined) return
        total_container.innerHTML = "" // limpia todo el contenedor
    
    
        let arrayProducts = data
    
        if (arrayProducts == undefined) {
            const response = await fetch(`${websiteUrl}/api/products`, {
                method: "GET"
            })
            .then(res => res.json())
            if (response.status != 200) return
    
            arrayProducts = response.response
        }
        
        if (arrayProducts == undefined) return
    
    
        let i = 0
        let max = 0
        let divsResize = []
    
        
    
        const updateDivs = (force) => {
            if (i>4 || force == true) {
                divsResize.forEach(obj => {
                    obj.div.style.width = "100%"
                    obj.div.style.height = `${Math.max(0, max-obj.y)}px`
                })
                i = 0
                max = 0
                divsResize = []
            }
        }
    
        arrayProducts.forEach(e => {
            i += 1
            updateDivs()
    
            const productFrame = createElement("div", total_container, ["productoFrame-type1"])
            const anchorButton = createElement("a", productFrame, ["productImage-type1"])
            const productImage = createElement("img", anchorButton, ["productImage-type1"])
            const productTitle = createElement("p", productFrame, ["productTitle-type1"])
            const productSeparador = createElement("div", productFrame, ["productSeparador-type1"])
            const SeparadorCodificar = createElement("div", productFrame, [])
            const productStock = createElement("p", productFrame, ["productStock-type1"])
            const productPrice = createElement("p", productFrame, ["productPrice-type1"])
    
            const cartContainer = createElement("div", productFrame, ["cartContainer-type1"])
            const addCartButton = createElement("button", cartContainer, ["productAddCart-type1"]) //, stockClass <= 0 ? "addCartAvailable-type1" : "addCartError-type1"])
            const addCartIcon = createElement("img", addCartButton, ["fullSize"])
    
            addCartButton.type = "button"
            addCartIcon.src = "./public/icons/cartIcon.png"
            addCartIcon.title = "Carrito de compras"
    
            productTitle.textContent = e.title
            const currentY = parseInt(getComputedStyle(productTitle).height)
            max = Math.max(max, currentY)
            divsResize.push({div: SeparadorCodificar, y: currentY, prod: e.title})
    
    
    
    
    
            const updater = (n) => {
    
                let stockClass = n.stock > 10 ? "productStockDisp-type1" : "productPocoStock-type1"
                stockClass = n.stock <= 0 ? "productNostock-type1" : stockClass
    
                productStock.classList = ""
                productStock.classList.add("productStock-type1")
                productStock.classList.add(stockClass)
    
                productPrice.textContent = convertPrice(n.price, ".")
    
                productImage.src = n.thumbnail
                productImage.alt = n.title
    
                productTitle.textContent = e.title
    
                if (n.stock <= 0) {
                    productStock.textContent = "SIN STOCK"
                } else if (n.stock <= 10) {
                    productStock.textContent = "POCO STOCK"
                } else {
                    productStock.textContent = "STOCK DISPONIBLE"
                }
    
                addCartButton.style.display = n.stock <= 0 ? "none" : ""
    
                productFrame.style.order = -n.stock
                e = n
            }
    
            updatersArray[e.id] = updater
            updater(e)
    
            anchorButton.href = `/products/${e.id}`
            addCartButton.addEventListener("click", async (data) => {
    
                if (e.stock > 0 ) {
                    const units = 1
    
                    const response = await fetch(`${websiteUrl}/api/carts/${currentCart}/product/${e.id}/${units}`, {
                        method: "PATCH",
                        body: JSON.stringify({units: units}),
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }).then(res => res.json())
        
                    if (response.status == 200) {
                        createAlert("Product added successfully", "bottom-right", 3000)
                        WEBSOCKET.emit("getCartContent", currentCart)
                    }
                }
                
            })
        })
    
        updateDivs(true)
    
        
    }
    WEBSOCKET.on("SERVER_ALLPRODUCTS_UPDATE_EVENT", (data) => {
        if (data == undefined || updatersArray.length != data.length) {
            completeViewUpdate(data) // si se encuentran menos o mas productos se hara un full refresh.
        } else {
            data.forEach(e => {
                const upd = updatersArray[e.id]
                if (upd) upd(e)
            })
        }
    
        
    })
    
    WEBSOCKET.on("SERVER_UNIQUEPRODUCT_UPDATE_EVENT", (data) => {
        const pid = data.id
        const updater = updatersArray[pid]
    
        if (updater) {
            updater(data)
        }
    })
    
    completeViewUpdate()
})
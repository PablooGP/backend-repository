WEBSOCKET.on("cartUpdated", i => {
    const cartText = document.getElementById("cartText")

    if (cartText != undefined) {
        cartText.textContent = i > 99 ? "99" : i
    }
})

WEBSOCKET.emit("getCartContent", currentCart) // cada vez que la pagina carga le dira al servidor que envie la cantidad de contenido en el carro.

const websiteUrl = 'http://localhost:3000'
const currentCart = 1

const WEBSOCKET = io()
const createElement = (elementCreate, newParent, classList) => {

    const element = document.createElement(elementCreate)
    newParent.appendChild(element)
    classList.forEach(e => {
        element.classList.add(e)
    })

    return element
}
const convertPrice = (amount, add) => {// recibe dos valores: un numero y un texto para agregar entre separaciones (Esto para convertir el amount en un texto mas bonito para el usuario)
    try {
        amount = Number(amount)

        const entero = Math.floor(amount)
        const centavos = amount-entero
        const amountString = entero.toString()
        const amountArray = amountString.split("")
        const amountString_reverse = amountArray.reverse().join("")

        let text = ""
        let init = 0
        if (entero>999) {
            const cant = Math.floor(amountArray.length/3)
            for (let i = 0; i<cant; i++) {
                text += amountString_reverse.substring(init, init+3) + add
                init += 3
            }
            if (init<amountString_reverse.length) { text += amountString_reverse.substring(init) }
            else { text = text.substring(0, text.length-1) }

            text = text.split("").reverse().join("")
        } else {
            text = String(entero) 
        }
        if (centavos != 0)  text += "," + (String(centavos) + "0").substring(2, 4) // esta mezcla toda rara es para evitar el .555555555555 y el 0.5 para que finalize en "0.55" y "0.50"}
        text = "$ " + text
        return text
    } catch(err) {
        return "ERROR"
    }
}

const createAlert = (title, position, timer) => {
    Swal.fire({
        title: title,
        icon: 'error',
        position: position,
        confirmButtonText: 'Cool',
        showConfirmButton: false,
        animation: false,
        toast: true,
        icon: 'success',
        timer: timer,
        timerProgressBar: true
    })
}
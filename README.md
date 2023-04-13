### Nombre del alumno: Pablo Lopez
### Entrega de Desafio 1

### El script 'main.js' contiene lo siguiente:

- Class 'ProductManager' que almacena todos los productos que se le den (Mientras se le den los datos requeridos)
- ProductManager.addProduct(objeto) recibe 6 datos los cuales son requeridos para crear el producto, se debe enviar en forma de objeto 'title' 'description' 'price' 'thumbnail' 'code' 'stock'. retorna objeto 'Producto' con los datos que se le dieron.
- ProductManager.getProducts() retorna la lista completa de todos los productos en forma de Array
- ProductManager.getProductById(id) recibe un 'id' el cual es unico e irrepetible entre todos los productos que se hayan almacenado. retorna un objeto 'Producto'
- Class 'Producto' recibe un objeto con varios datos, esta clase se utiliza al llamar a la funcion .addProduct() del ProductManager
- Producto.getStock() retorna la cantidad de stock que tiene el producto
- Producto.addStock(cantidad) agrega stock al producto dependiendo el valor 'cantidad'

### El siguiente codigo es para probar la clase ProductManager y Producto siguiendo los pasos del proceso de testing


```javascript
const Manager = new ProductManager()

console.log(Manager.getProducts())

Manager.addProduct({
    // Se debe enviar un objeto con los valores: title, description, price, thumbnail, code, stock
    // todos son requeridos para añadir un nuevo producto
    title: "Producto Prueba",
    description: "Este producto fue añadido para probar la clase ProductManager.",
    price: 100,
    thumbnail: "https://www.google.com/",
    code: "abc123",
    stock: 25
})

console.log(Manager.getProducts())

Manager.addProduct({
    title: "Producto Prueba",
    description: "Este producto fue añadido para probar la clase ProductManager.",
    price: 100,
    thumbnail: "https://www.google.com/",
    code: "abc123",
    stock: 25
})

for (let i=1; i<=5; i++) {
    const encontrado = Manager.getProductById(i)
    if (encontrado) {
        console.log(`Se encontro el Producto (Id: ${i}) usando la funcion getProductById()`, Manager.getProductById(i))
    } else {
        console.log(`No se encontro el Producto (Id: ${i}) usando la funcion getProductById()`)
    }
} 
```
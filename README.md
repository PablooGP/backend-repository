### Nombre del alumno: Pablo Lopez
### Entrega de Desafio 2

### El script 'main.js' contiene lo siguiente:

- Class 'ProductManager' que almacena todos los productos que se le den (Mientras se le den los datos requeridos)
- constructor ProductManager(path) Recibe una ruta para crear un archivo .json el cual almacenara todos los productos
    - function ProductManager.addProduct(objeto)
        - recibe 6 datos los cuales son requeridos para crear el producto, se debe enviar en forma de objeto 'title' 'description' 'price' 'thumbnail' 'code' 'stock'. retorna objeto 'Producto' con los datos que se le dieron.
        - Retorna un objeto con el siguiente contenido: message (sirve para identificar si todo salio bien o ocurrio un error) id (de todo salir bien te devolvera el id del producto creado)
    - function ProductManager.getProducts()
        - retorna la lista completa de todos los productos en forma de Array
    - function ProductManager.getProductById(id)
        - recibe un 'id' el cual es unico e irrepetible entre todos los productos que se hayan almacenado.
        - retorna un objeto con el siguiente contenido: message (para identificar errores) product (producto el cual estas buscando)
    - method ProductManager.updateProduct(id, datos)
        - recibe un id, con este id se buscara el producto en el array de productos y se modificara dependiendo lo que se recibio en el objeto 'datos'
    - function ProductManager.deleteProduct(id)
        - recibe un 'id', este se usara para quitar todos los productos con el mismo id
        - retorna un objeto con el siguiente contenido: message (para identificar errores) products (array de productos borrados)

- Class 'Producto' recibe un objeto con varios datos, esta clase se utiliza al llamar a la funcion .addProduct() del ProductManager
    - Property .id (Numero unico y autoasignable por el Manager)
    - Property .updated (Ultima vez que se modifico el producto)
    - Property .title (required)
    - Property .description
    - Property .price
    - Property .thumbnail
    - Property .code
    - Property .stock
### El siguiente codigo es para probar la clase ProductManager y Producto siguiendo los pasos del proceso de testing


```javascript
const Manager = new ProductManager("./data/data.json")

console.log(Manager.getProducts())

for (let i = 1; i<=10; i++) {
    const re = Manager.addProduct({
        title: "Producto Prueba",
        description: "Este producto fue añadido para probar la clase ProductManager.",
        price: 100,
        thumbnail: "https://www.google.com/",
        code: `abc${i+Date.now()}`,
    })
    console.log(re)
}

console.log("getProductById 9", Manager.getProductById(9))
console.log("updateProduct 9", Manager.updateProduct(9, {title: "cambios realizados", price: 55555, description: "333", id: 99999}))
console.log("deleteProduct", Manager.deleteProduct(10))

console.log(Manager.getProducts())
```
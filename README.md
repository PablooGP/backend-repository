### Nombre del alumno: Pablo Lopez
### Entrega de Desafio 3

### El script 'classes.js' contiene lo siguiente:

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

# Pasos a seguir para levantar el servidor:

## Instalar Express.
```bash
npm i express
```
## Iniciar el servidor desde la consola
```bash
npm run dev
```
## Importante de recordar:
```
-Hay solo 5 carritos (Cada objeto del carrito cuenta con 'pid' que es el product id y 'x' que es la cantidad del mismo producto)
-Hay un total de 250 productos (son todos iguales solo cambian los id y el valor 'updated')
-El producto id: 10 no existe.
-El servidor esta corriendo en el port numero 8080 como se pidio en el ppt
```

# Testing del servidor:

## Probando los endpoints de los productos:

[/products](http://localhost:8080/products) (Toma todos los productos)

[/products?limit=25](http://localhost:8080/products?limit=25) (Toma los primeros 25 productos, no olvides que el producto 10 no existe)

[/products/25](http://localhost:8080/products/25) (Toma el producto con el id 25)

## Probando los endpoints de los carritos:

[/carts](http://localhost:8080/carts) (Toma todos los carritos)

[/carts?limit=3](http://localhost:8080/carts?limit=3) (Toma los primeros 3 carritos)

[/carts/2](http://localhost:8080/carts/2) (Toma el carrito con el id 2)
### Nombre del alumno: Pablo Lopez
### Primera Entrega de Programacion Backend

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

# Testing del servidor via postman:

## Probando los endpoints de los productos:

```
Retorna todos los productos que existen

[GET] localhost:8080/api/products
Retorna un array con todos los productos.
```
```
Se usa para buscar muchos productos con limite

[GET] localhost:8080/api/products?limit=5
Retorna un array con un maximo de productos (En este caso 5)
```
```
Se usa para buscar un producto especifico

[GET] localhost:8080/api/products/3
Retorna el producto numero 3
```
```
Se usa para agregar un producto nuevo

[POST] localhost:8080/api/products
La informacion se envia por query params
Retorna el ID del producto agregado.
```
```
Se usa para actualizar un producto.

[PATCH] localhost:8080/api/products/:pid
Recibe id de un producto y lo edita via query params
Retorna el producto con todos sus cambios
```
```
Se usa para borrar un producto de la lista

[DELETE] localhost:8080/api/products/:pid
Recibe id de un producto
Retorna el producto que fue borrado
```
## Probando los endpoints de los carritos:

```
Se usa para tomar todos los carritos existentes

[GET] localhost:8080/api/carts
Retorna todos los carritos
```
```
Se usa para ver un carrito especifico

[GET] localhost:8080/api/carts/:cid
Recibe cartId como parametro
Retorna solo un carrito.
```
```
Crea un nuevo carrito vacio

[POST] localhost:8080/api/carts
Retorna el id del nuevo carrito creado
```
```
Agrega stock al carrito y quita stock del producto

[PATCH] localhost:8080/api/carts/:cid/product/:pid/:units
Recibe cid, pid, units como parametros
Retorna los productos del carrito
```
```
Quita el stock del carrito y se lo agrega el producto

[DELETE] localhost:8080/api/carts/:cid/product/:pid/:units
Recibe cid, pid, units como parametros
Retorna los productos del carrito
```
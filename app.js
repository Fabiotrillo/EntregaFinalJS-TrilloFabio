//PRODUCTO

class Producto {
    constructor(id, nombre, precio, descripcion, img) {
        this.id = id
        this.nombre = nombre
        this.precio = precio
        this.descripcion = descripcion
        this.img = img;
    }
}

//CARRITO

class Carrito {
    constructor() {
        this.listaCarrito = [];
        this.contenedorCarrito = document.getElementById(`contenedor__carrito`);
    }

    levantarStorage() {
        let listaCarritoJSON = localStorage.getItem("listaCarrito");
        this.listaCarrito = JSON.parse(listaCarritoJSON) || [];
    }

    guardarEnStorage() {
        let listaCarritoJSON = JSON.stringify(this.listaCarrito);
        localStorage.setItem("listaCarrito", listaCarritoJSON);
    }

    agregar(producto) {
        this.listaCarrito.push(producto);
        this.guardarEnStorage();
        this.mostrarProductos();
    }

    eliminar(productoEliminar) {
        this.listaCarrito = this.listaCarrito.filter(producto => producto.id !== productoEliminar.id);
        this.guardarEnStorage();
        this.mostrarProductos();
    }

    mostrarProductos() {
        this.contenedorCarrito.innerHTML = ''
        this.listaCarrito.forEach(producto => {
            this.contenedorCarrito.innerHTML += `<div class="card mb-3" style="max-width: 540px;"> 
            <div class="row g-0"> 
            <div class="col-md-4">
             <img src="${producto.img}" class="img-fluid rounded-start" alt="#">
            </div>
            <div class="col-md-8"> 
            <div class="card-body">
            <h5 class="card-title">${producto.nombre}</h5> 
            <p class="card-text">Precio: $${producto.precio}</p>
            <button class="btn btn-danger" id="eliminar-${producto.id}"><i class="fa-solid fa-trash"></i></button>
            </div>
            </div>
            </div> 
            </div>`
        });

        this.listaCarrito.forEach(producto => {
            let btn_eliminar = document.getElementById(`eliminar-${producto.id}`);
            btn_eliminar.addEventListener("click", () => {
                this.eliminar(producto);
            });
        });
    }
}

//PRODUCTO CONTROLLER

class ProductoController {
    constructor() {
        this.listaProductos = []
    }

    agregar(producto) {
        this.listaProductos.push(producto)
    }

    mostrarProductos() {
        let instancia__Productos = document.getElementById(`instancia__Productos`);
        instancia__Productos.innerHTML = ""
        this.listaProductos.forEach(producto => {
            instancia__Productos.innerHTML += `<div class="container">
             <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
              <div class="col">
              <div class="card shadow-sm">
              <img src="${producto.img}" class="producto-01" alt="">
              <div class="card-body">
              <h3 class="card-title">${producto.nombre}</h3>
              <p class="card-text"> ${producto.descripcion} </p>
              <p class="card-text">$ ${producto.precio}</p>
              <a href="#" class="btn btn-warning" id="ap-${producto.id}">Agregar al carrito</a>
            </div>
         </div>
     </div>`
        })


        this.listaProductos.forEach(producto => {
            const btn = document.getElementById(`ap-${producto.id}`)
            btn.addEventListener("click", () => {
                carrito.agregar(producto)
                carrito.mostrarProductos()
                carrito.guardarEnStorage()
            })
        })
    }
}

//INSTANCIAS DE PRODUCTO

const producto01 = new Producto(1, "Percha de madera", 599, "Percha de madera importada", "../img/prod02.jpg")
const producto02 = new Producto(2, "Percha de madera", 599, "Percha de madera importada", "../img/prod02.jpg")
const producto03 = new Producto(3, "Percha de madera", 700, "Percha de madera importada", "../img/prod03.jpg")


//INSTANCIA DE CARRITO
const carrito = new Carrito();
carrito.levantarStorage();
carrito.mostrarProductos()

//INSTANCIA DE PRODUCTOCONTROLLER

const Controlador_Producto = new ProductoController();

Controlador_Producto.agregar(producto01)
Controlador_Producto.agregar(producto02)
Controlador_Producto.agregar(producto03)

Controlador_Producto.mostrarProductos();

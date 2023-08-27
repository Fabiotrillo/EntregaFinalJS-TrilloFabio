//PRODUCTO

class Producto {
    constructor(id, nombre, precio, descripcion, img, cantidad) {
        this.id = id
        this.nombre = nombre
        this.precio = precio
        this.descripcion = descripcion
        this.img = img;
        this.cantidad = 1;
    }
    aumentarCantidad(){
        this.cantidad++
    }
    disminuirCantidad(){
        if(this.cantidad > 1){
            this.cantidad--
            return true
        }else{
            return false
        }
        
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
        localStorage.setItem("listaCarrito", listaCarritoJSON) ;
    }

    agregar(productoAgregar) {
        let existeElProducto = -this.listaCarrito.some(producto => producto.id == productoAgregar.id )

        if(existeElProducto){
            let producto = this.listaCarrito.find(producto => producto.id == productoAgregar.id)
            producto.cantidad++
        }else{
            this.listaCarrito.push(productoAgregar);
        }

        
        this.guardarEnStorage();
        this.mostrarProductos();
    }

    eliminar(productoEliminar) {
        this.listaCarrito = this.listaCarrito.filter(producto => producto.id !== productoEliminar.id);
        this.guardarEnStorage();
        this.mostrarProductos();
    }

    mostrarProductos() {
        
        let total = document.getElementById(`total`)
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
            <p class="card-text">Cantidad: <button class="btn btn-dark btn-sm" id="minus-${producto.id}"><i class="fa-solid fa-minus fa-2xs"></i></button>${producto.cantidad}<button class="btn btn-dark btn-sm" id="plus-${producto.id}"><i class="fa-solid fa-plus fa-2xs"></i></button></p>
            <button class="btn btn-danger" id="eliminar-${producto.id}"><i class="fa-solid fa-trash"></i></button>
            </div>
            </div>
            </div> 
            </div>`
        });

        //EVENTOS ELIMINAR Y AUMENTAR/DISMINUIR CANTIDAD
        this.listaCarrito.forEach(producto => {
             let btn_eliminar = document.getElementById(`eliminar-${producto.id}`);
             let btn_plus =document.getElementById(`plus-${producto.id}`);
             let btn_minus = document.getElementById(`minus-${producto.id}`);

            btn_eliminar.addEventListener("click", () => {
                this.eliminar(producto);
            });
            
            btn_plus.addEventListener("click", () => {
                producto.aumentarCantidad()
                this.mostrarProductos()
            })

            btn_minus.addEventListener("click", ()=>{
               if(producto.disminuirCantidad()){ 
                this.mostrarProductos()
            }
            })
        })
        
        total.innerHTML = `Total $${this.calcularTotal()}`;
    }
    calcularTotal(){
        return this.listaCarrito.reduce((acumulador, producto) => acumulador + producto.precio * producto.cantidad, 0)
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
            instancia__Productos.innerHTML += `
              <div class="col-lg-3">
                <div class="card mb-3">
                  <img src="${producto.img}" class="producto-01" alt="">
                     <div class="card-body">
                    <h3 class="card-title">${producto.nombre}</h3>
                    <p class="card-text">${producto.descripcion}</p>
                    <p class="card-text">$ ${producto.precio}</p>
                    <a class="btn btn-warning" id="ap-${producto.id}">Agregar al carrito</a>
                  </div>
                </div>
              </div> `
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
const producto02 = new Producto(2, "Percha de madera", 650, "Percha de madera importada", "../img/prod02.jpg")
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

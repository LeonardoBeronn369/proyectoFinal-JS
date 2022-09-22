const seccionproductos = document.getElementById('productos')
const CarroContenedor = document.getElementById('carroContenedor')
const contadorCarrito = document.getElementById('contadorCarro')
const vaciarCarritoModal = document.getElementById('vaciarCarrito')
const botonMenu = document.getElementById('botonMenu')
const finalizarCompra = document.getElementById('finalizarCompra')
const proxproductos = document.getElementById('proxproductos')



function borrarDatos() {
    localStorage.clear();
}


const Carro = JSON.parse(localStorage.getItem('carrito')) || []


let carrito = []

let productoss = [{
        id: 1,
        nombre: 'Jean Gastado',
        cantidad: 1,
        precio: 9000,
        img: './img/jeans2.jpg'
    },
    {
        id: 2,
        nombre: 'Sweater Amarillo',
        cantidad: 1,
        precio: 6500,
        img: './img/sweater.jpg'
    },
    {
        id: 3,
        nombre: 'Polera Blanca',
        cantidad: 1,
        precio: 7000,
        img: './img/elegido1-2.jpg'
    },
    {
        id: 4,
        nombre: 'Polera Amarilla',
        cantidad: 1,
        precio: 7000,
        img: './img/sweater6.jpg'
    },
    {
        id: 5,
        nombre: 'Sweater Bordo',
        cantidad: 1,
        precio: 6000,
        img: './img/sweater5.jpg'
    },
    {
        id: 6,
        nombre: 'Polera Roja',
        cantidad: 1,
        precio: 7000,
        img: './img/sweater1.jpg'
    }
    
]


productoss.forEach((producto) => {
    const div = document.createElement('div')
    div.classList.add('producto')
    div.innerHTML = `
            <div class="card">
                <div class="card-body">
                <img src=${producto.img}>
                <h3>${producto.nombre}</h3>
                <p class="precioProducto">Precio:$ ${producto.precio}</p>
                <button id="agregar${producto.id}" class="botonCard"><span>Agregar <i class="fas fa-shopping-cart"></i></span></button>
                </div>
            </div>
            `

    seccionproductos.appendChild(div)


    const boton = document.getElementById(`agregar${producto.id}`)


    boton.addEventListener('click', () => {
        agregarAlCarrito(producto.id)
    })
})



const agregarAlCarrito = (prodId) => {

    const listacarro = carrito.some(prod => prod.id === prodId)

    if (listacarro) {
        const prod = carrito.map(prod => {
            if (prod.id === prodId) {
                prod.cantidad++
            }
        })
    } else {

        const item = productoss.find((prod) => prod.id === prodId)
        carrito.push(item)
    }
    actualizarCarro()
}


const vaciarCarrito = (prodId) => {

    const item1 = carrito.find((prod) => prod.id === prodId)

    const indice = carrito.indexOf(item1)

    carrito.splice(indice, 1)

    actualizarCarro()

    borrarDatos()

}


const actualizarCarro = () => {

    CarroContenedor.innerHTML = ""

    carrito.forEach((prod) => {
        const div = document.createElement('div')
        div.className = ('productoEnCarrito')
        div.innerHTML = `
        <p>${prod.nombre}</p>
        <p>Precio:$${prod.precio}</p>
        <p>Cantidad: <span id="cantidad">${prod.cantidad}</span></p>
        <button onclick="vaciarCarrito(${prod.id})" class="btn btn-outline-danger boton-eliminar"><i class="fas fa-trash-alt"></i></button>
        `

        CarroContenedor.appendChild(div)

        localStorage.setItem('carrito', JSON.stringify(carrito))

    })

    contadorCarrito.innerText = carrito.length


    precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0)
}



// --------------  Alertas  --------------- //

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 4000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    },
    customClass: {
        popup: 'colored-toast'
      },
    }
  )
  
vaciarCarritoModal.addEventListener('click', () => {
    
    Swal.fire({
        title: 'Está seguro de vaciar el carrito?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#5390d9',
        cancelButtonColor: '#ff0054',
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Carrito Vacio',
          )
        carrito.length = 0
        actualizarCarro()
        borrarDatos()
        }
      })
        carrito.length = 0
        actualizarCarro()
        borrarDatos()
})


  finalizarCompra.addEventListener('click', () => {
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Gracias por su compra!',
        showConfirmButton: false,
        timer: 1500
      })
      
    carrito.length = 0
    actualizarCarro()
    borrarDatos()
})


  // ---------------  FETCH  ------------ //

  function crearHTML(productos) {

    proxproductos.innerHTML = ""

    productos.forEach((producto) => {
        const div = document.createElement('div')
        div.classList.add('producto')
        div.innerHTML = `
            <div class="card" style="width: 18rem;">
                <div class="card-body" id="items">
                    <img src=${producto.img}>
                    <h3>${producto.nombre}</h3>
                    <p class="precioProducto">Precio: ${producto.precio}</p>
                    <p>${producto.desc}</p>
                </div>
            </div>
                `
    
    proxproductos.appendChild(div)

    })
}


document.addEventListener('DOMContentLoaded', () => {
    fetchData()
})



const fetchData = async () => {
            
    try {
        const res = await fetch('./js/proximamente.json')
        const data = await res.json()
        
        crearHTML(data)
        }
     catch (error) {
        console.log(error);
    }
} 
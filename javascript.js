const productosIniciales = [
    { 
        id: 1, 
        nombre: "Jugo Surtido", 
        precio: 4, 
        stock: 400, 
        imagen: "surtido.jpg" // <-- Así llamas a tu foto local
    },
    { 
        id: 2, 
        nombre: "Jugo de Papaya", 
        precio: 5.00, 
        stock: 400, 
        imagen: "papaya.jpg" // <-- Así llamas a tu foto local
    },
    { 
        id: 3, 
        nombre: "coco", 
        precio: 3.50, 
        stock: 100, 
        imagen: "coco.jpg" // <-- Así llamas a tu foto local
    },
    // Y así sucesivamente con tus 10 productos...
    { 
        id: 4, 
        nombre: "Jugo de piña", 
        precio: 5, 
        stock: 400, 
        imagen: "piña.jpg" // <-- Así llamas a tu foto local
    },
    { 
        id: 5, 
        nombre: "Jugo de platano", 
        precio: 3.00, 
        stock: 400, 
        imagen: "platano.jpg" // <-- Así llamas a tu foto local
    },
    { 
        id: 6, 
        nombre: "queque de naranja", 
        precio: 2, 
        stock: 500, 
        imagen: "quequedenaranja.jpg" // <-- Así llamas a tu foto local
    },
        { 
        id: 7, 
        nombre: "queque de chocolate", 
        precio: 2, 
        stock: 500, 
        imagen: "queque.jpg" // <-- Así llamas a tu foto local
    },
    { 
        id: 8, 
        nombre: "queque de vainilla", 
        precio: 2.00, 
        stock: 50000, 
        imagen: "vainilla.jpg" // <-- Así llamas a tu foto local
    },
    { 
        id: 9, 
        nombre: "jugo de naranja pequeña", 
        precio: 1.50, 
        stock: 100, 
        imagen: "naranja.jpg" // <-- Así llamas a tu foto local
    },
        { 
        id: 10, 
        nombre: "jugo de naranja grande", 
        precio: 5, 
        stock: 100, 
        imagen: "naranja.jpg" // <-- Así llamas a tu foto local
    },
    { 
        id: 11, 
        nombre: "Jugo de Papaya", 
        precio: 5.00, 
        stock: 400, 
        imagen: "papaya.jpg" // <-- Así llamas a tu foto local
    },
    { 
        id: 12, 
        nombre: "jugo de mango", 
        precio: 7, 
        stock: 400, 
        imagen: "mangoo.jpg" // <-- Así llamas a tu foto local
    },
    { 
        id: 13, 
        nombre: "jugo de fresa", 
        precio: 7, 
        stock: 400, 
        imagen: "fresa.jpg" // <-- Así llamas a tu foto local
    },
    { 
        id: 14, 
        nombre: "jugo especial", 
        precio: 10, 
        stock: 400, 
        imagen: "especial.jpg" // <-- Así llamas a tu foto local
    }
    // Y así sucesivamente con tus 10 productos...

    // Y así sucesivamente con tus 10 productos...

    // Y así sucesivamente con tus 10 productos...
];

function cargarProductos() {
    try {
        const productosGuardados = JSON.parse(localStorage.getItem("mis_productos"));

        if (!Array.isArray(productosGuardados)) {
            return productosIniciales;
        }

        return productosGuardados.map(producto => ({
            ...producto,
            precio: Number(producto.precio) || 0,
            stock: Math.max(0, Number.parseInt(producto.stock, 10) || 0),
            imagen: producto.imagen || ""
        }));
    } catch (error) {
        return productosIniciales;
    }
}

let productos = cargarProductos();
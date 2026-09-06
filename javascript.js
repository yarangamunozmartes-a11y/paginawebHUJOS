const productosIniciales = [
    { 
        id: 1, 
        nombre: "Jugo Surtido Especial", 
        precio: 7.50, 
        stock: 15, 
        imagen: "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=300" 
    }
];

let productos = JSON.parse(localStorage.getItem("mis_productos")) || productosIniciales;
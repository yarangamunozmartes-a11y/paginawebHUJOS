let carrito = [];
const PASSWORD_ADMIN = "1234"; // Contraseña de tu panel

function mostrarProductos() {
    const contenedor = document.getElementById("contenedor-productos");
    contenedor.innerHTML = "";

    productos.forEach(prod => {
        let tarjeta = document.createElement("div");
        tarjeta.classList.add("tarjeta-producto");
        
        tarjeta.innerHTML = `
            <div>
                <img src="${prod.imagen}" alt="${prod.nombre}">
                <h3>${prod.nombre}</h3>
                <p>Precio: S/${prod.precio.toFixed(2)}</p>
                <p>Stock: <b>${prod.stock}</b></p>
            </div>
            <button onclick="agregarAlCarro(${prod.id})" ${prod.stock === 0 ? 'disabled style="background:gray;"' : ''}>
                ${prod.stock === 0 ? 'Agotado' : 'Agregar'}
            </button>
        `;
        contenedor.appendChild(tarjeta);
    });
    
    actualizarPanelAdmin();
}

function solicitarAccesoAdmin() {
    let clave = prompt("Ingresa la contraseña de administrador:");
    let panel = document.getElementById("panel-admin");

    if (clave === PASSWORD_ADMIN) {
        panel.style.display = panel.style.display === "none" ? "block" : "none";
    } else if (clave !== null) {
        alert("Contraseña incorrecta");
    }
}

function guardarProducto(event) {
    event.preventDefault();
    
    let id = document.getElementById("admin-id").value;
    let nombre = document.getElementById("admin-nombre").value;
    let precio = parseFloat(document.getElementById("admin-precio").value);
    let stock = parseInt(document.getElementById("admin-stock").value);
    let inputFile = document.getElementById("admin-imagen");

    let procesarGuardado = (imagenUrl) => {
        if (id) {
            let prod = productos.find(p => p.id == id);
            prod.nombre = nombre;
            prod.precio = precio;
            prod.stock = stock;
            if (imagenUrl) prod.imagen = imagenUrl;
        } else {
            let nuevoId = productos.length > 0 ? Math.max(...productos.map(p => p.id)) + 1 : 1;
            productos.push({ id: nuevoId, nombre, precio, stock, imagen: imagenUrl || "https://via.placeholder.com/300" });
        }

        sincronizarGuardado();
        limpiarFormulario();
    };

    if (inputFile.files && inputFile.files[0]) {
        let reader = new FileReader();
        reader.onload = function(e) {
            procesarGuardado(e.target.result);
        };
        reader.readAsDataURL(inputFile.files[0]);
    } else {
        procesarGuardado(null);
    }
}

function actualizarPanelAdmin() {
    let contenedorAdmin = document.getElementById("lista-admin-productos");
    contenedorAdmin.innerHTML = "";

    productos.forEach(prod => {
        let fila = document.createElement("div");
        fila.classList.add("item-admin-fila");
        fila.innerHTML = `
            <span><b>${prod.nombre}</b> - S/${prod.precio.toFixed(2)} (Stock: ${prod.stock})</span>
            <div>
                <button onclick="cargarParaEditar(${prod.id})" style="background: #ffc107; color:black;">Editar</button>
                <button onclick="eliminarProducto(${prod.id})" style="background: #dc3545;">Eliminar</button>
            </div>
        `;
        contenedorAdmin.appendChild(fila);
    });
}

function cargarParaEditar(id) {
    let prod = productos.find(p => p.id === id);
    document.getElementById("admin-id").value = prod.id;
    document.getElementById("admin-nombre").value = prod.nombre;
    document.getElementById("admin-precio").value = prod.precio;
    document.getElementById("admin-stock").value = prod.stock;
    document.getElementById("btn-guardar-prod").textContent = "Actualizar Producto";
}

function eliminarProducto(id) {
    if (confirm("¿Estás seguro de eliminar este producto del catálogo?")) {
        productos = productos.filter(p => p.id !== id);
        sincronizarGuardado();
    }
}

function limpiarFormulario() {
    document.getElementById("form-producto").reset();
    document.getElementById("admin-id").value = "";
    document.getElementById("btn-guardar-prod").textContent = "Agregar Producto";
}

function sincronizarGuardado() {
    localStorage.setItem("mis_productos", JSON.stringify(productos));
    mostrarProductos();
}

function agregarAlCarro(id) {
    let producto = productos.find(p => p.id === id);
    
    if (producto.stock > 0) {
        producto.stock--;
        
        let itemEnCarrito = carrito.find(item => item.id === id);
        if (itemEnCarrito) {
            itemEnCarrito.cantidad++;
        } else {
            carrito.push({ id: producto.id, nombre: producto.nombre, precio: producto.precio, cantidad: 1 });
        }

        mostrarProductos();
        actualizarCarrito();
    }
}

function quitarDelCarro(id) {
    let itemIndex = carrito.findIndex(item => item.id === id);
    
    if (itemIndex !== -1) {
        let producto = productos.find(p => p.id === id);
        
        if (producto) {
            producto.stock++;
        }

        if (carrito[itemIndex].cantidad > 1) {
            carrito[itemIndex].cantidad--;
        } else {
            carrito.splice(itemIndex, 1);
        }

        mostrarProductos();
        actualizarCarrito();
    }
}

function actualizarCarrito() {
    let lista = document.getElementById("lista-carrito");
    let totalPagar = document.getElementById("total-pagar");
    let btnWp = document.getElementById("btn-whatsapp");
    
    lista.innerHTML = "";
    let total = 0;

    if (carrito.length === 0) {
        lista.innerHTML = "<p>El carrito está vacío</p>";
        btnWp.disabled = true;
        totalPagar.textContent = "0.00";
        return;
    }

    btnWp.disabled = false;

    carrito.forEach(item => {
        let subtotal = item.precio * item.cantidad;
        total += subtotal;

        let li = document.createElement("li");
        li.innerHTML = `
            <span>${item.cantidad}x ${item.nombre} (S/${subtotal.toFixed(2)})</span>
            <button class="btn-quitar-item" onclick="quitarDelCarro(${item.id})">X</button>
        `;
        lista.appendChild(li);
    });

    totalPagar.textContent = total.toFixed(2);
}

function enviarWhatsApp() {
    let telefono = "51967483151"; // Cambia por tu número real de WhatsApp con código de país (Ej: 51 para Perú)
    let mensaje = "¡Hola! Quisiera realizar el siguiente pedido:%0A%0A";
    let total = 0;

    carrito.forEach(item => {
        let subtotal = item.precio * item.cantidad;
        total += subtotal;
        mensaje += `• ${item.cantidad}x ${item.nombre} (S/${subtotal.toFixed(2)})%0A`;
    });

    mensaje += `%0A*Total a pagar: S/${total.toFixed(2)}*`;

    let url = `https://wa.me/${telefono}?text=${mensaje}`;
    window.open(url, '_blank');
}

mostrarProductos();
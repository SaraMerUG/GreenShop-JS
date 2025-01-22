//ALMACENAR PRODUCTOS EN EL CARRITO
let carrito = [];

//MOSTRAR PLANTAS EN HTML
function renderPlants() {
    const plantsList = document.getElementById('plants-list');
    plantsList.innerHTML = '';

    plantas.forEach(planta => {
        const plantDiv = document.createElement('div');
        plantDiv.classList.add('plant');

        plantDiv.innerHTML = `
            <img src="${planta.imagen}" alt="${planta.nombre}">
            <h3>${planta.nombre}</h3>
            <p>${planta.descripcion}</p>
            <p>Precio: ${planta.precio}€</p>
            <button data-id="${planta.id}">Agregar al Carrito</button>
        `;

        plantDiv.querySelector('button').addEventListener('click', () => addToCart(planta));
        plantsList.appendChild(plantDiv);
    });
}

//AÑADIR PRODUCTO AL CARRITO
function addToCart(planta) {
    const existingProduct = carrito.find(item => item.id === planta.id);
    if (existingProduct) {
        if (existingProduct.cantidad < planta.stock) {
            existingProduct.cantidad++;
        } else {
            alert(`No hay stock de ${planta.nombre}`);
        }
    } else {
        carrito.push({ ...planta, cantidad: 1 });
    }
    updateCart();
}

//ACTUALIZAR CARRITO EN LA PÁGINA
function updateCart() {
    const cartItems = document.querySelector('.items');
    const totalElement = document.getElementById('total'); 
    cartItems.innerHTML = '';

    let total = 0;

    // RECORRER ARRAY CARRITO Y AÑADIR PRODUCTOS
    carrito.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('cart-item');
        itemDiv.innerHTML = `
            <p>${item.nombre} - ${item.cantidad} x ${item.precio}€</p>
            <button class="remove" data-id="${item.id}">Eliminar</button>
            <button class="increase" data-id="${item.id}">+</button>
            <button class="decrease" data-id="${item.id}">-</button>
        `;
        // INCREMENTO, DECREMENTO Y ELIMINACIÓN DE PRODUCTOS
        itemDiv.querySelector('.increase').addEventListener('click', () => changeQuantity(item.id, 1));
        itemDiv.querySelector('.decrease').addEventListener('click', () => changeQuantity(item.id, -1));
        itemDiv.querySelector('.remove').addEventListener('click', () => removeFromCart(item.id));
        cartItems.appendChild(itemDiv);
        total += item.cantidad * item.precio;
    });
    totalElement.textContent = `TOTAL: ${total}€`;
}

//CAMBIAR CANTIDAD DE PRODUCTO EN EL CARRITO
function changeQuantity(id, change) {
    const product = carrito.find(item => item.id === id);
    if (product.cantidad + change >= 1 && product.cantidad + change <= product.stock) {
        product.cantidad += change;
    } else {
        alert(`No puedes tener más de ${product.stock} o menos de 1 unidad.`);
    }
    updateCart();
}

//ELIMINAR PRODUCTO
function removeFromCart(id) {
    carrito = carrito.filter(item => item.id !== id);
    updateCart();
}

//VACIAR CARRITO
function clearCart() {
    carrito = [];
    updateCart();
}

//ABRIR Y CERRAR CARRITO
function toggleCart() {
    const cartDropdown = document.querySelector('.cart_dropdown');
    cartDropdown.classList.toggle('show');
}

//LLAMAR ELEMENTOS DEL DOM
const cartButton = document.getElementById('cart_button');
const cartDropdown = document.querySelector('.cart_dropdown');
const payButton = document.getElementById('pay');
const totalElement = document.getElementById('total');
const cartItemsList = document.querySelector('.items');
const cleanButton = document.getElementById('clean');

//MOSTRAR CARRITO
cartButton.addEventListener('click', () => {
    cartDropdown.classList.toggle('show');
});

//VACIAR CARRITO
cleanButton.addEventListener('click', () => {
    clearCart();
});

//PAGO
payButton.addEventListener('click', () => {
    if (carrito.length > 0) {
        clearCart();
        alert('¡Compra realizada con éxito!');
    } else {
        alert('Carrito vacío.');
    }
});

renderPlants();

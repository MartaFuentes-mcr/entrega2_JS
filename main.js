const cart = [];
const cartItems = document.getElementById("cart-items");
const totalElement = document.getElementById("total");
const subtotalElement = document.getElementById("subtotal");
const taxElement = document.getElementById("tax");
const discountElement = document.getElementById("discount");
const finalTotalElement = document.getElementById("final-total");
const activityLog = document.getElementById("activity-log");
const cartCount = document.getElementById("cart-count");

const addProductBtn = document.getElementById("add-product");
const clearCartBtn = document.getElementById("clear-cart");
const applyCouponBtn = document.getElementById("apply-coupon");

function updateCart() {
    cartItems.innerHTML = "";
    let subtotal = 0;

    cart.forEach((product, index) => {
        subtotal += product.price;

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${product.name}</td>
            <td>$${product.price}</td>
            <td><button class="danger" onclick="removeProduct(${index})">✖</button></td>
        `;
        cartItems.appendChild(row);
    });

    const tax = subtotal * 0.1;
    const discount = 0;
    const total = subtotal + tax - discount;

    subtotalElement.textContent = subtotal;
    taxElement.textContent = tax.toFixed(2);
    discountElement.textContent = discount;
    finalTotalElement.textContent = total.toFixed(2);
    totalElement.textContent = subtotal;

    cartCount.textContent = cart.length;
    cartCount.classList.add("badge-animate");
    setTimeout(() => cartCount.classList.remove("badge-animate"), 300);
}

function addProduct(name, price) {
    if (!name || price <= 0) return alert("Producto o precio inválido.");
    cart.push({ name, price });
    logActivity(`Agregado: ${name} por $${price}`);
    updateCart();
}

function removeProduct(index) {
    logActivity(`Eliminado: ${cart[index].name}`);
    cart.splice(index, 1);
    updateCart();
}

function logActivity(message) {
    const li = document.createElement("li");
    li.textContent = message;
    activityLog.prepend(li);
}

addProductBtn.addEventListener("click", () => {
    const name = document.getElementById("product-name").value;
    const price = parseFloat(document.getElementById("product-price").value);
    addProduct(name, price);
    document.getElementById("product-name").value = "";
    document.getElementById("product-price").value = "";
});

clearCartBtn.addEventListener("click", () => {
    if (confirm("¿Vaciar carrito?")) {
        cart.length = 0;
        logActivity("Carrito vaciado");
        updateCart();
    }
});

applyCouponBtn.addEventListener("click", () => {
    const coupon = prompt("Ingrese un cupón de descuento:");
    if (coupon === "DESC10") {
        const discount = parseFloat(finalTotalElement.textContent) * 0.1;
        discountElement.textContent = discount.toFixed(2);
        finalTotalElement.textContent = 
            (parseFloat(finalTotalElement.textContent) - discount).toFixed(2);
        logActivity("Cupón aplicado: 10% de descuento");
    } else {
        alert("Cupón no válido.");
    }
});

// Agregar productos recomendados
document.querySelectorAll(".add").forEach((btn, index) => {
    btn.addEventListener("click", () => {
        const products = [
            { name: "Leche", price: 3 },
            { name: "Pan", price: 2 }
        ];
        const product = products[index];
        addProduct(product.name, product.price);
    });
});




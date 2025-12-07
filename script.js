// ---------- CART PANEL OPEN/CLOSE ----------
const cartIcon = document.querySelector(".cart-icon");
const cartPanel = document.getElementById("cart-panel");
const closeCart = document.querySelector(".close-cart");

cartIcon.addEventListener("click", () => {
    cartPanel.classList.add("active");
});

closeCart.addEventListener("click", () => {
    cartPanel.classList.remove("active");
});

// ---------- CART STATE (LOCALSTORAGE) ----------
let cart = JSON.parse(localStorage.getItem("cart") || "[]");

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelector(".cart-count").textContent = count;
}

function updateCartTotal() {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const totalEl = document.querySelector(".cart-total");
    if (totalEl) {
        totalEl.textContent = "Total: ₹" + total;
    }
}

function renderCartItems() {
    const cartItemsContainer = document.querySelector(".cart-items");
    cartItemsContainer.innerHTML = "";

    if (cart.length === 0) {
        cartItemsContainer.innerHTML =
            '<p class="empty-text">Your cart is empty 🛒</p>';
        updateCartTotal();
        return;
    }

    cart.forEach((item, index) => {
        const row = document.createElement("div");
        row.className = "cart-item-row";
        row.style.display = "flex";
        row.style.alignItems = "center";
        row.style.justifyContent = "space-between";
        row.style.marginBottom = "12px";
        row.style.gap = "10px";

        row.innerHTML = `
        <div style="display:flex; align-items:center; gap:10px;">
            <img src="${item.image_url}" alt="${item.name}"
                style="width:50px; height:50px; object-fit:cover; border-radius:6px;">
            <div>
            <strong>${item.name}</strong><br>
            <span style="font-size:12px; opacity:.8;">
                Qty: ${item.quantity} · ₹${item.price}
            </span>
            </div>
        </div>
        <button data-index="${index}" class="remove-item-btn" style="
            background:#ff4d4d;
            border:none;
            color:white;
            border-radius:6px;
            padding:4px 8px;
            cursor:pointer;
            font-size:12px;
        ">Remove</button>
    `;

        cartItemsContainer.appendChild(row);
    });

    // Remove handlers
    cartItemsContainer.querySelectorAll(".remove-item-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            const idx = Number(btn.dataset.index);
            cart.splice(idx, 1);
            saveCart();
            updateCartCount();
            renderCartItems();
        });
    });

    updateCartTotal();
}

function addToCart(product) {
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
        existing.quantity += 1;
    } else {
        // include image_url so we can show image in cart
        cart.push({
            id: product.id,
            name: product.name || product.title || product.name,
            price: product.price,
            image_url: product.image_url,
            quantity: 1,
        });
    }
    saveCart();
    updateCartCount();
    renderCartItems();
}

// ---------- LOAD PRODUCTS FROM FASTAPI ----------
async function loadProducts() {
    const res = await fetch("/products");
    const products = await res.json();

    const grid = document.getElementById("products-grid");
    grid.innerHTML = "";

    products.forEach((p) => {
        const card = document.createElement("div");
        card.className = "item-card";
        card.innerHTML = `
        <div class="img-box">
            <img src="${p.image_url}" alt="${p.name}">
        </div>
        <div class="bottom-row">
            <h2>${p.name}</h2>
            <p class="price">₹${p.price}</p>
        </div>
        <div class="button-row">
            <button class="cart-btn">Add to Cart</button>
            <button class="buy-btn">Buy Now</button>
        </div>
    `;

        // Add to Cart
        card.querySelector(".cart-btn").addEventListener("click", () => {
            addToCart(p);
        });

        // Buy Now (for now just add to cart and open panel)
        card.querySelector(".buy-btn").addEventListener("click", () => {
            addToCart(p);
            cartPanel.classList.add("active");
        });

        grid.appendChild(card);
    });
}

// ---------- INITIALIZE ----------
loadProducts();
updateCartCount();
renderCartItems();

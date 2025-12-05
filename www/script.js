const cartIcon = document.querySelector(".cart-icon");
const cartPanel = document.getElementById("cart-panel");
const closeCart = document.querySelector(".close-cart");

cartIcon.addEventListener("click", () => {
    cartPanel.classList.add("active");
});
closeCart.addEventListener("click", () => {
    cartPanel.classList.remove("active");
});

// Load products from FastAPI and build cards
async function loadProducts() {
    const res = await fetch("http://localhost:8000/products");
    const products = await res.json();

    const grid = document.getElementById("products-grid");
    grid.innerHTML = "";

    products.forEach(p => {
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
        grid.appendChild(card);
    });
}

loadProducts();

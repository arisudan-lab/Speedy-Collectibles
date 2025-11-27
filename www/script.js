const cartIcon = document.querySelector(".cart-icon");
const cartPanel = document.getElementById("cart-panel");
const closeCart = document.querySelector(".close-cart");

cartIcon.addEventListener("click", () => {
    cartPanel.classList.add("active");
});

closeCart.addEventListener("click", () => {
    cartPanel.classList.remove("active");
});

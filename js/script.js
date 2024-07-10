// script.js

document.addEventListener("DOMContentLoaded", function () {
  // Toggle class 'aktif' on navbar-nav when menu button is clicked
  const navbarNav = document.querySelector(".navbar-nav");
  document.querySelector("#menu-toko").onclick = () => {
    navbarNav.classList.toggle("aktif");
  };

  // Replace feather icons
  feather.replace();

  // Initialize cart count and elements
  const cartCountSpan = document.getElementById("cart-count");
  updateCartCount(); // Update cart count on page load

  // Add event listeners to 'Masuk Keranjang' buttons
  const addToCartButtons = document.querySelectorAll(".add-to-cart");
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const name = button.getAttribute("data-name");
      const price = parseFloat(button.getAttribute("data-price"));
      const image = button.getAttribute("data-image");

      // Add product to cart (localStorage)
      addToCart(name, price, image);
    });
  });

  // Function to add product to cart (localStorage)
  function addToCart(name, price, image) {
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    cartItems.push({ name, price, image });
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    updateCartCount(); // Update cart count after adding a product
    showNotification("Product added to cart"); // Show notification
  }

  // Function to update cart count displayed in the header
  function updateCartCount() {
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    cartCountSpan.textContent = cartItems.length;
  }

  // Function to show notification
  function showNotification(message) {
    const notificationText = document.getElementById("notification-text");
    notificationText.textContent = message;
    const notification = document.querySelector(".notification");
    notification.style.display = "block";

    setTimeout(() => {
      notification.style.display = "none";
    }, 2000); // Hide notification after 2 seconds
  }
});

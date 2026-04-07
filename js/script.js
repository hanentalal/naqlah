let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Add product to cart
function addToCart(name, image, price, rating) {
  cart.push({ name, image, price, rating });
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
}

// Toggle cart panel
function toggleCart() {
  document.getElementById('cart-panel').classList.toggle('active');
}

// Render cart
function renderCart() {
  const container = document.getElementById('cart-items');
  const totalElem = document.getElementById('total-price');
  const count = document.getElementById('count');

  container.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;
    const div = document.createElement("div");
    div.className = "cart-card";
    div.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <p>${item.name}</p>
      <p>SAR ${item.price} ⭐ ${item.rating}</p>
      <button onclick="removeItem(${index})">❌</button>
    `;
    container.appendChild(div);
  });

  totalElem.innerText = `المجموع: SAR ${total.toFixed(2)}`;
  count.innerText = cart.length;
}

// Remove product from cart
function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
}

window.onload = renderCart;

let cart = JSON.parse(localStorage.getItem('cart')) || [];
let users = JSON.parse(localStorage.getItem('users')) || [];

// ================= CART =================
function addToCart(name, image, price, rating) {
  cart.push({ name, image, price, rating });
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
}

function toggleCart() {
  document.getElementById('cart-panel').classList.toggle('active');
}

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
      <img src="${item.image}">
      <p>${item.name}</p>
      <p>SAR ${item.price} ⭐ ${item.rating}</p>
      <button onclick="removeItem(${index})">❌</button>
    `;

    container.appendChild(div);
  });

  totalElem.innerText = `المجموع: SAR ${total.toFixed(2)}`;
  count.innerText = cart.length;
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
}

// ================= AUTH UI =================
function checkAuth() {
  const authArea = document.getElementById("auth-area");
  const userData = JSON.parse(localStorage.getItem("currentUser"));

  if (userData) {
    const fullName = `${userData.firstName} ${userData.lastName}`;

    authArea.innerHTML = `
      <div class="user-menu">
        <span class="user-icon" onclick="toggleUserMenu()">👤</span>

        <div id="dropdown-menu" class="dropdown-menu">
          <div class="user-name">👋 ${fullName}</div>
          <p onclick="toggleCart()">🛒 عرض السلة</p>
          <p onclick="logout()">🚪 تسجيل الخروج</p>
        </div>
      </div>
    `;
  } else {
    authArea.innerHTML = `
      <button class="auth-btn" onclick="openModal()">تسجيل الدخول</button>
    `;
  }
}

// ================= DROPDOWN =================
function toggleUserMenu() {
  const menu = document.getElementById("dropdown-menu");
  menu.classList.toggle("show");
}

// Close dropdown when clicking outside
document.addEventListener("click", function(e) {
  const menu = document.getElementById("dropdown-menu");
  const icon = document.querySelector(".user-icon");

  if (!menu || !icon) return;

  if (!icon.contains(e.target) && !menu.contains(e.target)) {
    menu.classList.remove("show");
  }
});

// ================= MODAL =================
function openModal() {
  document.getElementById("auth-modal").style.display = "flex";
}

function closeModal() {
  document.getElementById("auth-modal").style.display = "none";
}

function showSignup() {
  document.getElementById("login-form").style.display = "none";
  document.getElementById("signup-form").style.display = "block";
}

function showLogin() {
  document.getElementById("login-form").style.display = "block";
  document.getElementById("signup-form").style.display = "none";
}

// ================= AUTH LOGIC =================
function handleSignup() {
  const firstName = document.getElementById("first-name").value.trim();
  const lastName = document.getElementById("last-name").value.trim();
  const mobile = document.getElementById("mobile").value.trim();
  const username = document.getElementById("signup-username").value.trim();
  const password = document.getElementById("signup-password").value.trim();

  // Validation
  if (!firstName || !lastName || !mobile || !username || !password) {
    alert("يرجى تعبئة جميع الحقول");
    return;
  }

  if (mobile.length < 8) {
    alert("رقم الجوال غير صحيح");
    return;
  }

  const exists = users.find(u => u.username === username);
  if (exists) {
    alert("اسم المستخدم مستخدم بالفعل");
    return;
  }

  const newUser = {
    firstName,
    lastName,
    mobile,
    username,
    password
  };

  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));

  alert("تم إنشاء الحساب بنجاح!");
  showLogin();
}

function handleLogin() {
  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;

  const user = users.find(u => u.username === username && u.password === password);

  if (!user) {
    alert("بيانات غير صحيحة");
    return;
  }

  // Save full user object
  localStorage.setItem("currentUser", JSON.stringify(user));

  closeModal();
  checkAuth();
}

function logout() {
  localStorage.removeItem("currentUser");
  checkAuth();
}

// ================= LOAD =================
window.onload = function () {
  renderCart();
  checkAuth();
};




let currentIndex = 0;

function startSlider() {
  const slides = document.querySelectorAll(".slider-card");

  setInterval(() => {
    slides[currentIndex].classList.remove("active");

    currentIndex = (currentIndex + 1) % slides.length;

    slides[currentIndex].classList.add("active");
  }, 2000); // 2 seconds
}

// Start when page loads
window.addEventListener("load", startSlider);
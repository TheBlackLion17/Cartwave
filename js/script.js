let products = [
  { name: "Product 1", price: 499, img: "images/product1.jpg" },
  { name: "Product 2", price: 799, img: "images/product2.jpg" }
];

let cart = [];

/* LOAD PRODUCTS */
function loadProducts() {
  let html = "";

  products.forEach((p, i) => {
    html += `
      <div class="card">
        <img src="${p.img}">
        <h3>${p.name}</h3>
        <p>₹${p.price}</p>
        <button onclick="addToCart(${i})">Add to Cart</button>
        <button onclick="buyNow(${i})">Buy Now</button>
      </div>
    `;
  });

  document.getElementById("productList").innerHTML = html;
}

/* ADD TO CART */
function addToCart(i) {
  cart.push(products[i]);
  updateCart();
}

/* UPDATE CART */
function updateCart() {
  let html = "";
  let total = 0;

  cart.forEach(item => {
    html += `<p>${item.name} - ₹${item.price}</p>`;
    total += item.price;
  });

  document.getElementById("cartItems").innerHTML = html;
  document.getElementById("total").innerText = total;
  document.getElementById("cartCount").innerText = cart.length;
}

/* CART TOGGLE */
function toggleCart() {
  document.getElementById("cartBox").classList.toggle("active");
}

/* SHOW ORDER */
function showOrder() {
  document.getElementById("orderBox").style.display = "block";
}

/* UPI PAYMENT */
function payUPI() {
  let total = document.getElementById("total").innerText;

  let upi = "yourupi@okaxis"; // CHANGE THIS

  let url = `upi://pay?pa=${upi}&pn=Store&am=${total}&cu=INR`;

  window.location.href = url;
}

/* WHATSAPP ORDER */
function orderWhatsApp() {
  let name = document.getElementById("name").value;
  let phone = document.getElementById("phone").value;
  let address = document.getElementById("address").value;

  if (!name || !phone || !address) {
    alert("Fill all details");
    return;
  }

  let productList = "";
  let total = 0;

  cart.forEach(item => {
    productList += `${item.name} - ₹${item.price}\n`;
    total += item.price;
  });

  let message =
`🛒 New Order

Name: ${name}
Phone: ${phone}
Address: ${address}

Products:
${productList}

Total: ₹${total}`;

  let number = "918547178698"; // CHANGE THIS

  let url = "https://wa.me/" + number + "?text=" + encodeURIComponent(message);

  window.location.href = url;
}

/* BUY NOW */
function buyNow(i) {
  cart = [products[i]];
  updateCart();
  toggleCart();
}

/* START */
loadProducts();  let message =
`🛒 New Order

👤 Name: ${name}
📞 Phone: ${phone}
📍 Address: ${address}

📦 Products:
${productList}

💰 Total: ₹${total}`;

  let number = "918547178698"; // CHANGE THIS

  let url = "https://wa.me/" + number + "?text=" + encodeURIComponent(message);

  window.location.href = url;
}

/* ======================
   BUY NOW
====================== */
function buyNow(i) {
  cart = [products[i]];
  updateCart();
  toggleCart();
}

/* ======================
   START
====================== */
loadProducts();

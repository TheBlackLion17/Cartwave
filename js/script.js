let products = [
 { name:"Product 1", price:499, img:"images/product1.jpg" },
 { name:"Product 2", price:799, img:"images/product2.jpg" }
];

let cart = [];

// Load Products
function loadProducts(){
 let html = "";
 products.forEach((p,i)=>{
  html += `
  <div class="card">
    <img src="${p.img}">
    <h3>${p.name}</h3>
    <p>₹${p.price}</p>
    <button onclick="addToCart(${i})">Add to Cart</button>
    <button onclick="buyNow(${i})">Buy Now</button>
  </div>`;
 });
 document.getElementById("productList").innerHTML = html;
}

// Add to Cart
function addToCart(i){
 cart.push(products[i]);
 updateCart();
}

// Update Cart
function updateCart(){
 let html = "";
 let total = 0;

 cart.forEach(item=>{
  html += `<p>${item.name} - ₹${item.price}</p>`;
  total += item.price;
 });

 document.getElementById("cartItems").innerHTML = html;
 document.getElementById("total").innerText = total;
 document.getElementById("cartCount").innerText = cart.length;
}

// Toggle Cart
function toggleCart(){
 document.getElementById("cartBox").classList.toggle("active");
}

// Show Order Form
function showOrder(){
 document.getElementById("orderBox").style.display = "block";
}

// UPI Payment
function payUPI(){
 let total = document.getElementById("total").innerText;
 let upi = "yourupi@okaxis"; // CHANGE THIS

 let url = `upi://pay?pa=${upi}&pn=MyStore&am=${total}&cu=INR`;
 window.location.href = url;
}

// WhatsApp Order
function orderWhatsApp(){
 let name = document.getElementById("name").value;
 let phone = document.getElementById("phone").value;
 let address = document.getElementById("address").value;

 let productList = "";
 let total = 0;

 cart.forEach(item=>{
  productList += `${item.name} - ₹${item.price}%0A`;
  total += item.price;
 });

 let message = `🛒 *New Order* %0A%0A👤 Name: ${name}%0A📞 Phone: ${phone}%0A📍 Address: ${address}%0A%0A📦 Products:%0A${productList}%0A💰 Total: ₹${total}`;

 let number = "918547178698"; // CHANGE THIS

 window.open(`https://wa.me/${number}?text=${message}`, "_blank");
}

// Buy Now
function buyNow(i){
 cart = [products[i]];
 updateCart();
 toggleCart();
}

// Start
loadProducts();

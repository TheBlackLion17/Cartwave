import { app, db, auth, storage } from './firebase.js';
import { ref as dbRef, push, onValue, remove, update } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-database.js";
import { ref as storageRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-storage.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-auth.js";

const loginBtn = document.getElementById("loginBtn");
const addBtn = document.getElementById("addBtn");
const emailEl = document.getElementById("email");
const passwordEl = document.getElementById("password");
const nameEl = document.getElementById("name");
const priceEl = document.getElementById("price");
const imageFileEl = document.getElementById("imageFile");
const productForm = document.getElementById("productForm");
const productsDiv = document.getElementById("products");

const whatsappNumber = "919999999999"; // Replace with your number

// Admin login
loginBtn.onclick = async () => {
  try {
    await signInWithEmailAndPassword(auth, emailEl.value, passwordEl.value);
    alert("Logged in as admin");
    productForm.style.display = "block";
  } catch(err) {
    alert("Login failed: " + err.message);
  }
};

// Add product
addBtn.onclick = async () => {
  const file = imageFileEl.files[0];
  if(!file){ alert("Select image"); return; }
  const storageReference = storageRef(storage, 'images/' + file.name);
  await uploadBytes(storageReference, file);
  const url = await getDownloadURL(storageReference);
  push(dbRef(db, 'products'), { name: nameEl.value, price: priceEl.value, image: url });
};

// Display products
onValue(dbRef(db,'products'), snapshot => {
  const data = snapshot.val() || {};
  let html = "";
  for(let id in data){
    html += `<div class="card">
      <img src="${data[id].image}" width="100%">
      <h3>${data[id].name}</h3>
      <p>₹${data[id].price}</p>
      <button onclick="order('${data[id].name}','${data[id].price}')">Order</button>`;
    
    // Show edit/delete only if admin is logged
    if(auth.currentUser){
      html += `<button onclick="edit('${id}')">Edit</button>
               <button onclick="del('${id}')">Delete</button>`;
    }
    html += `</div>`;
  }
  productsDiv.innerHTML = html;
});

// Order via WhatsApp
window.order = (name,price) => {
  const msg = `Order: ${name} Price: ₹${price}`;
  window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`);
};

// Delete product
window.del = async (id) => { await remove(dbRef(db,'products/' + id)); };

// Edit product
window.edit = async (id) => {
  const newName = prompt("New name:");
  const newPrice = prompt("New price:");
  update(dbRef(db,'products/' + id), { name:newName, price:newPrice });
};

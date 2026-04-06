
import { db } from './firebase.js';
import { ref as dbRef, onValue } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-database.js";

const productsDiv = document.getElementById("products");
const whatsappNumber = "919999999999"; // Replace with your number

onValue(dbRef(db,'products'), snapshot=>{
    const data = snapshot.val() || {};
    let html = "";
    for(let id in data){
        html += `<div class="card">
        <img src="${data[id].image}" width="100%">
        <h3>${data[id].name}</h3>
        <p>₹${data[id].price}</p>
        <button onclick="order('${data[id].name}','${data[id].price}')">Order</button>
        </div>`;
    }
    productsDiv.innerHTML = html;
});

window.order = (name,price)=>{
    const msg = \`Order: \${name} Price: ₹\${price}\`;
    window.open(\`https://wa.me/\${whatsappNumber}?text=\${encodeURIComponent(msg)}\`);
};


import { db, auth, storage } from './firebase.js';
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
const adminList = document.getElementById("adminList");

loginBtn.onclick = async ()=>{
    try{
        await signInWithEmailAndPassword(auth,emailEl.value,passwordEl.value);
        alert("Logged in");
        productForm.style.display = "block";
    }catch(err){alert(err.message);}
};

addBtn.onclick = async ()=>{
    const file = imageFileEl.files[0];
    if(!file){alert("Select image"); return;}
    const storageReference = storageRef(storage, 'images/'+file.name);
    await uploadBytes(storageReference,file);
    const url = await getDownloadURL(storageReference);
    push(dbRef(db,'products'), { name:nameEl.value, price:priceEl.value, image:url });
};

// Display and manage products
onValue(dbRef(db,'products'), snapshot=>{
    const data = snapshot.val() || {};
    let html = "";
    for(let id in data){
        html += `<li>
        ${data[id].name} - ₹${data[id].price}
        <button onclick="edit('${id}')">Edit</button>
        <button onclick="del('${id}')">Delete</button>
        </li>`;
    }
    adminList.innerHTML = html;
});

window.del = async (id)=>{
    await remove(dbRef(db,'products/'+id));
};

window.edit = async (id)=>{
    const newName = prompt("New name:");
    const newPrice = prompt("New price:");
    update(dbRef(db,'products/'+id), { name:newName, price:newPrice });
};

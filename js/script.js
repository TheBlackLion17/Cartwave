function orderWhatsApp(){
 let name = document.getElementById("name").value;
 let phone = document.getElementById("phone").value;
 let address = document.getElementById("address").value;

 if(!name || !phone || !address){
  alert("Please fill all details");
  return;
 }

 let productList = "";
 let total = 0;

 cart.forEach(item=>{
  productList += `${item.name} - ₹${item.price}\n`;
  total += item.price;
 });

 let message = 
`🛒 New Order

👤 Name: ${name}
📞 Phone: ${phone}
📍 Address: ${address}

📦 Products:
${productList}

💰 Total: ₹${total}`;

 // 🔥 IMPORTANT: Encode message properly
 let encodedMessage = encodeURIComponent(message);

 // 🔥 IMPORTANT: Correct number format (no +, no spaces)
 let number = "918547178698"; // CHANGE THIS

 let url = `https://wa.me/${number}?text=${encodedMessage}`;

 window.open(url, "_blank");
}

function orderWhatsApp(){
 let name = document.getElementById("name").value;
 let phone = document.getElementById("phone").value;
 let address = document.getElementById("address").value;

 if(!name || !phone || !address){
  alert("Fill all details");
  return;
 }

 let productList = "";
 let total = 0;

 cart.forEach(item=>{
  productList += item.name + " - ₹" + item.price + "\\n";
  total += item.price;
 });

 let message = 
"New Order\\n\\n" +
"Name: " + name + "\\n" +
"Phone: " + phone + "\\n" +
"Address: " + address + "\\n\\n" +
"Products:\\n" + productList + "\\n" +
"Total: ₹" + total;

 let number = "918547178698"; // YOUR NUMBER

 let url = "https://wa.me/" + number + "?text=" + encodeURIComponent(message);

 window.location.href = url; // 🔥 IMPORTANT CHANGE
}

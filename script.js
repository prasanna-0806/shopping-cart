let cart = JSON.parse(localStorage.getItem("cart")) || [];
function renderCart() {
  const tbody = document.getElementById("cartBody");
  tbody.innerHTML = "";
  const subtotalEl = document.getElementById("subtotal");
  const discountEl = document.getElementById("discount");
  const totalEl = document.getElementById("finalTotal");

  let subtotal = 0;
  cart.forEach((item, i) => {
    const itemTotal = item.price * item.quantity;
    subtotal += itemTotal;
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${i + 1}</td>
      <td>${item.name}</td>
      <td>₹ ${item.price.toFixed(2)}</td>
      <td>${item.quantity}</td>
      <td>₹ ${itemTotal.toFixed(2)}</td>
      <td><button class="btn-danger" style="padding:0.5rem 1rem;font-size:0.9rem;" onclick="removeItem(${i})">Delete</button></td>
    `;
    tbody.appendChild(row);
  });
  const discount = subtotal > 10000 ? subtotal * 0.05 : 0;
  const finalTotal = subtotal - discount;
  subtotalEl.textContent = subtotal.toFixed(2);
  discountEl.textContent = discount.toFixed(2);
  totalEl.textContent = finalTotal.toFixed(2);
  localStorage.setItem("cart", JSON.stringify(cart));
}
function addToCart() {
  const name = document.getElementById("productName").value.trim();
  const price = parseFloat(document.getElementById("productPrice").value);
  const qty = parseInt(document.getElementById("productQty").value);

  if (!name || isNaN(price) || price <= 0 || isNaN(qty) || qty < 1) {
    alert("Please enter valid product name, price, and quantity.");
    return;
  }
  cart.push({ name, price, quantity: qty });
  renderCart();
  document.getElementById("productName").value = "";
  document.getElementById("productPrice").value = "";
  document.getElementById("productQty").value = "1";
}

function removeItem(index) {
  cart.splice(index, 1);
  renderCart();
}

function clearCart() {
  if (confirm("Clear entire cart?")) {
    cart = [];
    renderCart();
  }
}

renderCart();

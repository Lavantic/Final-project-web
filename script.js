// Redirect to products page when "Shop Now" is clicked
document.addEventListener("DOMContentLoaded", () => {
  const cartItems = document.getElementById("cart-items");
  const emptyMsg = document.getElementById("empty-cart-msg");
  
  if (cartItems && emptyMsg) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length > 0) {
      emptyMsg.style.display = "none";  // Hide empty cart message
      cartItems.innerHTML = "";          // Clear previous list items

      cart.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.name} - ${item.qty} x $${item.price.toFixed(2)}`;
        cartItems.appendChild(li);
      });
    } else {
      emptyMsg.style.display = "block"; // Show empty cart message
      cartItems.innerHTML = "";          // Clear list just in case
    }
  }
});


  // Display checkout items if on checkout page
  if (document.getElementById("checkout-items")) {
    displayCheckoutItems();
  }

  // Review form validation
  const form = document.getElementById("review-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("username").value.trim();
      const product = document.getElementById("product").value;
      const rating = document.getElementById("rating").value;
      const experience = document.getElementById("experience").value.trim();
      const message = document.getElementById("review-msg");

      if (!name || !product || !rating || !experience) {
        message.textContent = "Please complete all fields.";
        message.style.color = "red";
        return;
      }

      if (experience.length < 10) {
        message.textContent = "Experience must be at least 10 characters long.";
        message.style.color = "red";
        return;
      }

      message.textContent = "Thank you for your feedback!";
      message.style.color = "green";
      form.reset();
    });
  }
});

// ✅ Add to Cart function (correct version)
function addToCart(productName) {
  const prices = {
    "Wireless Headphones": 59.99,
    "Smart Watch": 89.99,
    "Bluetooth Speaker": 39.99
  };

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existingItem = cart.find(item => item.name === productName);

  if (existingItem) {
    existingItem.qty += 1;
  } else {
    cart.push({
      name: productName,
      price: prices[productName],
      qty: 1
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${productName} added to cart.`);
}

// ✅ Display Checkout Items and Auto-Calculate Totals
function displayCheckoutItems() {
  const items = JSON.parse(localStorage.getItem("cart")) || [];
  const container = document.getElementById("checkout-items");
  const form = document.getElementById("checkout-form");
  const message = document.getElementById("checkout-message");

  if (!container || !form) return;

  if (items.length === 0) {
    container.innerHTML = "<p>Your cart is empty. <a href='products.html'>Go shopping</a>.</p>";
    form.style.display = "none";
    return;
  }

  let html = "<table><thead><tr><th>Product</th><th>Qty</th><th>Price</th><th>Total</th></tr></thead><tbody>";
  items.forEach((item, index) => {
    html += `
      <tr>
        <td>${item.name}</td>
        <td><input type="number" min="1" value="${item.qty}" data-index="${index}" class="qty-input" /></td>
        <td>$${item.price.toFixed(2)}</td>
        <td class="item-total" id="item-total-${index}">$${(item.qty * item.price).toFixed(2)}</td>
      </tr>
    `;
  });
  html += "</tbody></table>";
  html += `
    <div class="checkout-summary">
      <p>Subtotal: $<span id="subtotal">0.00</span></p>
      <p>Tax (10%): $<span id="tax">0.00</span></p>
      <p><strong>Total: $<span id="total">0.00</span></strong></p>
    </div>
  `;
  container.innerHTML = html;

  calculateTotals();

  document.querySelectorAll(".qty-input").forEach(input => {
    input.addEventListener("input", (e) => {
      const index = e.target.dataset.index;
      const newQty = parseInt(e.target.value);
      if (newQty < 1) return;
      items[index].qty = newQty;
      localStorage.setItem("cart", JSON.stringify(items));
      displayCheckoutItems(); // re-render totals
    });
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const requiredFields = ["fullname", "address", "city", "zip", "card", "expiry", "cvv"];
    let isValid = true;

    requiredFields.forEach(id => {
      const field = document.getElementById(id);
      if (!field.value.trim()) {
        field.style.borderColor = "red";
        isValid = false;
      } else {
        field.style.borderColor = "#ccc";
      }
    });

    if (!isValid) {
      message.textContent = "Please fill in all required fields correctly.";
      message.style.color = "red";
      return;
    }

    message.textContent = "Order placed successfully!";
    message.style.color = "green";
    localStorage.removeItem("cart");
    form.reset();
    container.innerHTML = "<p>Thank you for your order!</p>";
  });
}

// ✅ Calculate totals for checkout
function calculateTotals() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  let subtotal = 0;

  cart.forEach((item, index) => {
    const itemTotal = item.price * item.qty;
    subtotal += itemTotal;
    const totalCell = document.getElementById(`item-total-${index}`);
    if (totalCell) totalCell.textContent = `$${itemTotal.toFixed(2)}`;
  });

  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  document.getElementById("subtotal").textContent = subtotal.toFixed(2);
  document.getElementById("tax").textContent = tax.toFixed(2);
  document.getElementById("total").textContent = total.toFixed(2);
}

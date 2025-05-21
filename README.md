
---

## 🔑 Key Features and Roles

### 1. **Product Listing Page (`products.html`)**
- Displays available products with images, names, and prices.
- Each product includes an **"Add to Cart"** button.
- The `addToCart()` function updates the `localStorage` with selected items.

### 2. **Shopping Cart Page (`cart.html`)**
- Displays cart items retrieved from `localStorage`.
- Shows each item's name, quantity, and total price.
- If no items are added, shows a message: **"Your cart is empty."**

### 3. **Checkout Page (`checkout.html`)**
- Dynamically displays cart items in a table format.
- Allows users to update quantity directly from the page.
- Calculates and displays **subtotal, tax (10%)**, and **total**.
- Includes form validation for shipping and payment information.
- On successful submission, clears the cart and thanks the user.

### 4. **JavaScript Functionality (`script.js`)**
- **`addToCart()`**: Adds a product to the cart and saves it in `localStorage`.
- **`displayCheckoutItems()`**: Renders checkout page content dynamically and handles live quantity updates.
- **`calculateTotals()`**: Computes subtotal, tax, and total.
- **`DOMContentLoaded` listener**: Handles page-specific logic like loading cart items and validating forms.

### 5. **Responsive Design (`style.css`)**
- Mobile-first and responsive layout using CSS Flexbox.
- Clean and modern look across all pages.
- Navigation menu and footer appear consistently across pages.

---

## ⚙️ How It Works

- Cart data is stored in the browser’s **localStorage** so it persists across page reloads and navigation.
- JavaScript functions ensure a dynamic user experience without a backend.

---

## ✅ Future Improvements

- Add backend functionality for authentication and orders.
- Include product filters, search, and user reviews.
- Add real payment gateway integration.

---

## 👨‍💻 Developed By

ENOCK FIFII BAFFOE

Front-end Developer & Designer

---

## 📄 License

This project is open-source and free to use for learning and development purposes.

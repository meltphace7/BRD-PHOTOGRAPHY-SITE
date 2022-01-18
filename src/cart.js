"use strict";

// Cart
const cartLink = document.querySelector(".cart-link");
const mobileCartLink = document.querySelector(".mobile-cart-link");
const cartGrid = document.querySelector(".cart-grid");
const cartItem = document.querySelector(".cart-item");
const checkOutBtn = document.querySelector(".checkout-btn");
const totalItemsField = document.querySelector(".total-items-field");
const cartItemCount = document.querySelector(".cart-item-count");
const mobileCartItemCount = document.querySelector(".mobile-cart-item-count");
const totalPriceField = document.querySelector(".total-price-field");
const removeBtn = document.querySelectorAll(".remove-btn");
const minusBtn = document.querySelectorAll(".minus");
const addBtn = document.querySelectorAll(".add");
const cartLinks = document.querySelectorAll(".cart-link");
// const cartItemCounts = document.querySelector(".cart-item-count");

let cart = JSON.parse(localStorage.getItem("CART")) || [];

// RENDERS CART ITEMS

// nav.classList.add("sticky");
// totalCartContainer.classList.add("sticky");

const renderCartItem = function () {
  cartGrid.innerHTML = "";
  if (cart.length < 1)
    cartGrid.innerHTML = "<h1 class='cart-empty'>Your cart is empty</h1>";
  if (cart.length < 1) return;
  cart.forEach((item) => {
    cartGrid.insertAdjacentHTML(
      "afterbegin",
      `
        <div class="cart-item" data-item="${item.id}">
        <div class="cart-image-container">
          <img
            class="cart-item-image"
            src="${item.image}"
          />
          <button class="remove-btn" data-item="${item.id}" >x</button>
        </div>
        <div class="cart-item-stats">
        <h3 class="cart-item-text cart-item-name">${item.name}</h3>
        <p class="cart-item-text cart-item-price">$${item.price}</p>
        <div class="unit-container">
        <button class="unit-control minus" data-item="${item.id}">-</button>
        <p class="cart-item-text cart-item-unit">${item.unit}</p>
        <button class="unit-control add" data-item="${item.id}">+</button>
        </div>
        <p class="cart-item-text cart-item-total-price">$${
          item.price * item.unit
        }</p>
        </div>
      </div>
          `
    );
  });
};

renderCartItem();

// CART COLOR
if (cart.length >= 1) {
  cartLink.style.color = "rgb(60, 215, 60)";
  mobileCartLink.style.color = "rgb(60, 215, 60)";
}

// REMOVE CART ITEM

const removeCartItem = function (id) {
  const newCart = cart.filter((item) => item.id !== id);
  cart = newCart;
  localStorage.setItem("CART", JSON.stringify(cart));
  if (cart.length === 0) {
    cartLink.style.color = `white`;
    mobileCartLink.style.color = `white`;
  }
};

/* ___ update items ___*/

// const totalPriceUnits = function(id) {

// }

const calcPrice = function () {
  const totalPrice = cart.reduce((acc, cur) => acc + cur.price * cur.unit, 0);
  totalPriceField.innerHTML = "";
  totalPriceField.innerHTML = `Total: $${totalPrice}`;
};
calcPrice();

const calcItems = function () {
  const totalItems = cart.reduce((acc, cur) => acc + cur.unit, 0);
  cartItemCount.innerHTML = `${totalItems}`;
  mobileCartItemCount.innerHTML = `${totalItems}`;
  // cartItemCount.innerHTML = `${totalItems}`;
  totalItemsField.innerHTML = `Items: ${totalItems}`;
};
calcItems();

const updateCart = function () {
  calcItems();
  calcPrice();
  localStorage.setItem("CART", JSON.stringify(cart));
  renderCartItem();
};

/* ___ INCREMENT ITEMS ___*/

const incrementUnit = function (id) {
  const [itemSelect] = cart.filter((items) => items.id === id);
  if (itemSelect.unit < itemSelect.stock) itemSelect.unit++;
};

/* ___ DECREMENT ITEMS ___*/
const decrementUnit = function (id) {
  const [itemSelect] = cart.filter((items) => items.id === id);
  if (itemSelect.unit > 1) itemSelect.unit--;
};

//////////////////////////
// REMOVE LISTENER
cartGrid.addEventListener("click", function (e) {
  if (e.target.classList.contains("remove-btn")) {
    const clicked = e.target;

    if (!clicked) return;
    removeCartItem(+clicked.dataset.item);
    updateCart();
  }
});

///////////////////////
// ADD UNIT LISTENER

cartGrid.addEventListener("click", function (e) {
  if (e.target.classList.contains("add")) {
    const clicked = e.target;

    if (!clicked) return;
    incrementUnit(+clicked.dataset.item);
    updateCart();
  }
});

///////////////////////
// MINUS UNIT LISTENER

cartGrid.addEventListener("click", function (e) {
  if (e.target.classList.contains("minus")) {
    const clicked = e.target;

    if (!clicked) return;
    decrementUnit(+clicked.dataset.item);
    updateCart();
  }
});

if (cart.length >= 1) cartLink.style.color = `rgb(60, 215, 60)`;

//   cartLink.style.color = `white`;

///////////

/////////////////////

/* _______  CART ______________*/

// CART COLOR
// cartLinks.forEach((cartLink) => {
//   if (cart.length >= 1) {
//     cartLink.style.color = "rgb(60, 215, 60)";
//   }
// });
// // if (cart.length >= 1) {
// //   cartLink.style.color = "rgb(60, 215, 60)";
// // }

// // const calcCartItems = function () {
// //   const totalItems = cart.reduce((acc, cur) => acc + cur.unit, 0);
// //   cartItemCounts.forEach((c) => {
// //     c.innerHTML = `${totalItems}`;
// //   });
// // };
// // calcCartItems();

//////////////////////////////

"use strict";

const cartLink = document.querySelector(".cart-link");
const cartItemCount = document.querySelector(".cart-item-count");
const mobileCartLink = document.querySelector(".mobile-cart-link");
const mobileCartItemCount = document.querySelector(".mobile-cart-item-count");

/////////////////////

/* _______  CART ______________*/

let cart = JSON.parse(localStorage.getItem("CART")) || [];

// CART COLOR
if (cart.length >= 1) {
  cartLink.style.color = "rgb(60, 215, 60)";
  mobileCartLink.style.color = "rgb(60, 215, 60)";
}

const calcItems = function () {
  const totalItems = cart.reduce((acc, cur) => acc + cur.unit, 0);

  cartItemCount.innerHTML = `${totalItems}`;
  mobileCartItemCount.innerHTML = `${totalItems}`;
};
calcItems();

//////////////////////////////

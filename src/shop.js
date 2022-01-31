"use strict";
// ___________   SHOP.JS

// Shop
const printGrid = document.querySelector(".print-grid");
// Cart
const cartGrid = document.querySelector(".cart-grid");
const cartItem = document.querySelectorAll(".cart-item");
const checkOutBtn = document.querySelector(".checkout-btn");
const totalItemsField = document.querySelector(".total-items-field");
const cartItemCount = document.querySelector(".cart-item-count");
const mobileCartItemCount = document.querySelector(".mobile-cart-item-count");
const totalPriceField = document.querySelector(".total-price-field");
const removeBtn = document.querySelectorAll(".remove-btn");
const cartLink = document.querySelector(".cart-link");
const mobileCartLink = document.querySelector(".mobile-cart-link");
const addToCartBtn = document.querySelectorAll(".add-to-cart-btn");
///////////////////////////////////////////////
const products = [
  {
    id: 0,
    name: "Ediza Lake",
    price: 300,
    stock: 5,
    image: "resources/img/CA_EDIZA-LAKE_PANO_tiny.jpg",
  },
  {
    id: 1,
    name: "Thousand Island Lake",
    price: 250,
    stock: 5,
    image: "resources/img/CA_THOUSAND-ISLAND-LAKE_PANO_tiny.jpg",
  },
  {
    id: 2,
    name: "Iceberg Lake",
    price: 250,
    stock: 5,
    image: "resources/img/CA-Iceberg-Lake_tiny.jpg",
  },
  {
    id: 3,
    name: "Lonesome Lake",
    price: 200,
    stock: 5,
    image: "resources/img/WY_LONESOME-LAKE_tiny.jpg",
  },
  {
    id: 4,
    name: "Island Lake",
    price: 200,
    stock: 5,
    image: "resources/img/WY_ISLAND-LAKE-DAWN_lowRes.jpg",
  },
  {
    id: 5,
    name: "St. Helens at Dawn",
    price: 200,
    stock: 5,
    image: "resources/img/WA_St.HELENS_SUNRISE_lowRes5.jpg",
  },
];

//// LOAD CART
let cart = JSON.parse(localStorage.getItem("CART")) || [];

let soldOutItemIDS = [];

//// CHECK IF ITEM IS IN STOCK
const checkStock = function () {
  const soldOut = cart.filter((item) => item.unit === item.stock);
  const soldOutID = soldOut.map((item) => item.id);
  soldOutItemIDS.push(...soldOutID);
};
checkStock();

/* _______  SHOP ________________________*/

const renderShopItems = function () {
  printGrid.innerHTML = "";
  products.forEach((product) => {
    printGrid.insertAdjacentHTML(
      "beforeend",
      `
      <div class="print-grid-item">
      <img class="print-item-image" src="${product.image}" />
      <div class="print-text-box print-text-box-1">
        <div class="ptb-1">${product.name}</div>
        <div class="ptb-2">Limited Edition</div>
        <div class="ptb-3">$${product.price}</div>
        <button class="add-to-cart-btn" data-item="${product.id}">${
        soldOutItemIDS.includes(product.id) ? "SOLD OUT" : "ADD TO CART"
      }</button>
      </div>
    </div>
      `
    );
  });
};

renderShopItems();

// CART COLOR
if (cart.length >= 1) {
  cartLink.style.color = "rgb(60, 215, 60)";
  mobileCartLink.style.color = "rgb(60, 215, 60)";
}

// ADD ITEMS
const addToCart = function (id) {
  // const [selectedItem] = products.filter((item) => item.id === id);
  // console.log(selectedItem);
  if (cart.some((item) => item.id === id)) {
    calcUnits(id);
  } else {
    const selectedItem = products.find((product) => product.id === id);
    cart.push({
      ...selectedItem,
      unit: 1,
    });
  }
  cartLink.style.color = "rgb(60, 215, 60)";
  mobileCartLink.style.color = "rgb(60, 215, 60)";
};

const calcUnits = function (id) {
  const item = cart.find((product) => product.id === id);
  if (item && item.unit < item.stock) item.unit++;
};

const calcItems = function () {
  const totalItems = cart.reduce((acc, cur) => acc + cur.unit, 0);
  cartItemCount.innerHTML = `${totalItems}`;
  mobileCartItemCount.innerHTML = `${totalItems}`;
};
calcItems();

// ADD ITEMS LISTENER
printGrid.addEventListener("click", function (e) {
  if (e.target.closest(".add-to-cart-btn")) {
    const btn = e.target;
    const id = +btn.dataset.item;
    if (!btn) return;
    addToCart(id);
    localStorage.setItem("CART", JSON.stringify(cart));
    calcItems();
    checkStock();
    renderShopItems();
  }
});

//////////
// const cartLinks = document.querySelectorAll(".cart-link");
// const cartItemCounts = document.querySelectorAll(".cart-item-count");

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

// const calcCartItems = function () {
//   const totalItems = cart.reduce((acc, cur) => acc + cur.unit, 0);
//   cartItemCounts.forEach((c) => {
//     c.innerHTML = `${totalItems}`;
//   });
// };
// calcCartItems();

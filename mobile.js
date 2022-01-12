"use strict";

const mobileNavMenu = document.querySelector(".mobile-nav-menu");
const hamburgerMenu = document.querySelector(".hamburger-menu");

/* _______  MOBILE_NAV ______________*/

const hideMobileNavMenu = function () {
  mobileNavMenu.classList.add("mobile-nav--hide");
};

hideMobileNavMenu();

const showMobileNavMenu = function () {
  mobileNavMenu.classList.toggle("mobile-nav--hide");
};

hamburgerMenu.addEventListener("click", showMobileNavMenu);

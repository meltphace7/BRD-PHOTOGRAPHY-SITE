"use strict";

const nav = document.querySelector(".nav");
const header = document.querySelector(".header");
const navLine = document.querySelector(".nav-line");
// const mobileNavMenu = document.querySelector(".mobile-nav-menu");
// const hamburgerMenu = document.querySelector(".hamburger-menu");

/* _______  MOBILE_NAV ______________*/

// const hideMobileNavMenu = function () {
//   mobileNavMenu.classList.add("mobile-nav--hide");
// };

// hideMobileNavMenu();

// const showMobileNavMenu = function () {
//   mobileNavMenu.classList.toggle("mobile-nav--hide");
// };

// hamburgerMenu.addEventListener("click", showMobileNavMenu);

/* _______  STICKY NAV ______________*/

// const addStickyNav = function (entries) {
//   const [entry] = entries;

//   if (!entry.isIntersecting) {
//     nav.classList.add("sticky");
//   } else {
//     nav.classList.remove("sticky");
//   }
// };

// const headerObserver = new IntersectionObserver(addStickyNav, {
//   root: null,
//   threshold: 0,
// });

// headerObserver.observe(header);

/* _________  SECTION FADE IN ________________*/

const allSections = document.querySelectorAll(".section");

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  theshold: 0.2,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

/////////////////////

/* _______  CART ______________*/

// let cart = JSON.parse(localStorage.getItem("CART")) || [];

// // CART COLOR
// if (cart.length >= 1) {
//   cartLink.style.color = "rgb(60, 215, 60)";
// }

// const calcItems = function () {
//   const totalItems = cart.reduce((acc, cur) => acc + cur.unit, 0);
//   cartItemCount.innerHTML = `${totalItems}`;
// };
// calcItems();

//////////////////////////////

/* _______  HEADER AUTO SLIDER ______________*/
const headerSlides = document.querySelectorAll(".header-slide");
const headerSlider = document.querySelector(".header-slider");
const dotContainer = document.querySelector(".dot-container");
const headerSlideNext = document.querySelector(".header-slider-btn-right");
const headerSlidePrev = document.querySelector(".header-slider-btn-left");

let curHeaderSlide = 0;
const maxHeaderSlide = headerSlides.length - 1;

const createDots = function () {
  headerSlides.forEach((_, i) => {
    dotContainer.insertAdjacentHTML(
      "beforeend",
      `<button class="dot" data-slide="${i}"></button>`
    );
  });
};

createDots();

const activateDot = function (slide) {
  document
    .querySelectorAll(".dot")
    .forEach((slide) => slide.classList.remove("dot--active"));

  document
    .querySelector(`.dot[data-slide="${slide}"]`)
    .classList.add("dot--active");
};

const goToHeaderSlide = function (slide) {
  headerSlides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
};

goToHeaderSlide(0);
activateDot(0);

const setHeaderActive = function () {
  headerSlides.forEach((s) => s.classList.remove("header-slide--active"));
  headerSlides[curHeaderSlide].classList.add("header-slide--active");
};

const nextHeaderSlide = function () {
  if (curHeaderSlide === maxHeaderSlide) {
    curHeaderSlide = 0;
  } else {
    curHeaderSlide++;
  }
  setHeaderActive();
  goToHeaderSlide(curHeaderSlide);
  activateDot(curHeaderSlide);
  console.log("next slide");
};

const prevHeaderSlide = function () {
  if (curHeaderSlide === 0) {
    curHeaderSlide = maxHeaderSlide;
  } else {
    curHeaderSlide--;
  }
  setHeaderActive();
  goToHeaderSlide(curHeaderSlide);
  activateDot(curHeaderSlide);
  console.log("prev slide");
};

const rotateSlide = setInterval(nextHeaderSlide, 15000);

const rotateSlides = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) {
    console.log("STOP SLIDE");
    clearInterval(rotateSlide);
  }
};

const headerSliderObserver = new IntersectionObserver(rotateSlides, {
  root: null,
  threshold: 0,
});

headerSliderObserver.observe(headerSlider);

document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowRight") {
    console.log("click");
    nextHeaderSlide();
  }
});

document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowLeft") {
    console.log("click");
    prevHeaderSlide();
  }
});

headerSlideNext.addEventListener("click", nextHeaderSlide);
headerSlidePrev.addEventListener("click", prevHeaderSlide);

dotContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("dot")) {
    const { slide } = e.target.dataset;

    goToHeaderSlide(slide);
    activateDot(slide);
  }
});

//// SLIDER-CONTROL-FADE-IN

const sliderControls = document.querySelector(
  ".header-slider-control-container"
);

sliderControls.style.opacity = "0";

const fadeIn = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) {
    console.log("DOOOOOO");
    sliderControls.style.opacity = "1";
  }
};

const navObserver = new IntersectionObserver(fadeIn, {
  root: null,
  theshold: 0.8,
});

navObserver.observe(nav);
/* _______  SLIDER ______________*/

// const slides = document.querySelectorAll(".slide");
// const btnNext = document.querySelector(".slider-btn-next");
// const btnPrev = document.querySelector(".slider-btn-prev");
// const dotContainer = document.querySelector(".dot-container");

// let curSlide = 0;
// const maxSlide = slides.length - 1;

// const createDots = function () {
//   slides.forEach((_, i) => {
//     dotContainer.insertAdjacentHTML(
//       "beforeend",
//       `
//       <button class="dot" data-slide="${i}"></button>
//     `
//     );
//   });
// };

// createDots();

// const activateDot = function (slide) {
//   document
//     .querySelectorAll(".dot")
//     .forEach((dot) => dot.classList.remove("dot--active"));

//   document
//     .querySelector(`.dot[data-slide="${slide}"]`)
//     .classList.add("dot--active");
// };

// const goToSlide = function (slide) {
//   slides.forEach(
//     (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
//   );
// };

// goToSlide(0);
// activateDot(0);

// const nextSlide = function () {
//   if (curSlide === maxSlide) {
//     curSlide = 0;
//   } else {
//     curSlide++;
//   }
//   goToSlide(curSlide);
//   activateDot(curSlide);
// };

// const prevSlide = function () {
//   if (curSlide === 0) {
//     curSlide = maxSlide;
//   } else {
//     curSlide--;
//   }
//   goToSlide(curSlide);
//   activateDot(curSlide);
// };

// btnNext.addEventListener("click", nextSlide);
// btnPrev.addEventListener("click", prevSlide);

// document.addEventListener("keydown", function (e) {
//   if (e.key === "ArrowRight") nextSlide();
//   if (e.key === "ArrowLeft") prevSlide();
// });

// dotContainer.addEventListener("click", function (e) {
//   if (e.target.classList.contains("dot")) {
//     const { slide } = e.target.dataset;

//     goToSlide(slide);
//     activateDot(slide);
//   }
// });

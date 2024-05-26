let order = [];
let totalPrice = 0;
let totalCart = document.querySelector(".selection-title");
const resultEl = document.querySelector(".shopping-reset-list");
const shoppingList = document.querySelector(".shopping-list");

shoppingList.addEventListener("click", products);

function products(event) {
  if (
    event.target.className !== "shopping-plus-image" &&
    event.target.className !== "shopping-minuse-image"
  ) {
    return;
  }
  const date = event.target.closest(".shopping-list-points");
  const numberItem = date.querySelector(".shopping-heading-text-sum");
  if (event.target.className === "shopping-plus-image") {
    plus(date.dataset.name);
    plusPrice(date.dataset.value);
  } else {
    const result = minuse(date.dataset.name);
    if (!result) {
      return;
    }
    minusPrice(date.dataset.value);
  }
  numberItem.textContent = order[`${date.dataset.name}`];
  changeResult();
}

function minuse(name) {
  order[`${name}`] -= 1;
  if (order[`${name}`] <= 0) {
    delete order[`${name}`];
  }
  return true;
}

function plus(name) {
  if (!order[`${name}`]) {
    order[`${name}`] = 1;
    return;
  }
  order[`${name}`] += 1;
}

function minusPrice(price) {
  totalPrice -= Number(price);
}
function plusPrice(price) {
  totalPrice += Number(price);
}
function changeResult() {
  let result = "";
  let numbCart = 0;
  for (const name in order) {
    result += `<li class="shopping-reset-list-item">${name}: ${
      order[`${name}`]
    }</li>`;
    numbCart += Number(order[`${name}`]);
  }
  totalCart.innerHTML = `<h3 class="selection-title">your cart: ${numbCart}</h3>`;
  resultEl.innerHTML = result;
  updateCart();
}

const promoInput = document.querySelector(".selection-input");
const promoP = document.querySelector(".selection-promocode");
promoInput.addEventListener("input", applyPromo);
const promocode = "free.eat";
function applyPromo() {
  const promoValue = promoInput.value;
  if (promoValue === promocode) {
    promoP.textContent = "discount: 10%";
    totalPromo();
  } else {
    promoP.textContent = ``;
    promoEl.textContent = ``;
  }
}
const totalPriceEl = document.querySelector(".selection-title-price");
function updateCart() {
  let finalPrice = totalPrice;
  totalPriceEl.innerText = `Total Price: $${finalPrice}`;

  if (finalPrice < 0) {
    totalPriceEl.innerText = `Total Price: $${0}`;
  }
  return finalPrice;
}
const promoEl = document.querySelector(".total-price-promo");
function totalPromo() {
    const result = updateCart() * 0.9;
    promoEl.textContent = `${result}`;
}
const resetBtx = document.querySelector(".selection-title-reset");
resetBtx.addEventListener("click", reset);
function reset() {
  order = [];
  totalPrice = 0;
  totalCart.textContent = `your cart:`;
  totalPromo.textContent = ``;
  resultEl.textContent = ``;
  promoEl.textContent = ``;
  totalPriceEl.textContent = ``;
  promoP.textContent = ``;
  promoInput.value = ``;
}

const blockEl = document.querySelector(".hero-list");
const listItem = document.querySelectorAll(".hero-list-item");
const rightEl = document.querySelector(".hero-list-item-button-right");
const leftEl = document.querySelector(".hero-list-item-button-left");
listItem[0].classList.add("zindexOne");
listItem[1].classList.add("zindexTwo");
listItem[2].classList.add("zindexThree");
if (window.screen.width >= 1200) {
  let curentEl = document.querySelector(".hero-list-item-tbc").className;
  blockEl.addEventListener("click", fun);
  function fun(event) {
    const currentElem = event.target.closest(".hero-list-item");
    if (currentElem) {
      if (currentElem.className === curentEl) {
        return;
      }
      curentEl = currentElem.className;
      listItem.forEach((item) => {
        if (!(currentElem.className === item.className)) {
          if (item.classList.contains("zindexThree")) {
            item.classList.remove("zindexThree");
            item.classList.add("zindexTwo");
          } else if (item.classList.contains("zindexTwo")) {
            item.classList.remove("zindexTwo");
            item.classList.add("zindexOne");
          }
        }
      });
      currentElem.classList.add("zindexThree");
    }
  }
}
if (window.screen.width < 1200) {
  const ElementTree = document.querySelector("zindexThree");
  let current = 2;
  rightEl.addEventListener("click", right);
  leftEl.addEventListener("click", left);
  function right() {
    current += 1;
    if (current >= 3) {
      current = 0;
    }
    listItem.forEach((item, index) => {
      if (current === index) {
        item.classList.add("zindexThree");
      } else {
        item.classList.remove("zindexThree");
      }
    });
  }
  function left() {
    current -= 1;
    if (current <= -1) {
      current = 2;
    }
    listItem.forEach((item, index) => {
      if (current === index) {
        item.classList.add("zindexThree");
      } else {
        item.classList.remove("zindexThree");
      }
    });
  }
}

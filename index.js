
const order = {};
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
  changeResult();
}

function minuse(name) {
  order[name] -= 1;
  if (!order[name]) {
    return false;
  }
  if (order[name] <= 0) {
    delete order[name];
  }
  return true;
}

function plus(name) {
  if (!order[name]) {
    order[name] = 1;
    return;
  }
  order[name] += 1;
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
    result += `<li class="shopping-reset-list-item">${name}: ${order[name]}</li>`;
    numbCart += Number(order[name]);
  }
  totalCart.innerHTML = `<h3 class="selection-title">your cart: ${numbCart}</h3>`;
  resultEl.innerHTML = result;
  updateCart();
}

const promocode = "free.eat";
const promoInput = document.querySelector(".selection-input");
const promoP = document.querySelector(".selection-promocode");

promoInput.addEventListener("input", promo);

function promo() {
  applyPromo();
}

function applyPromo() {
  const promoValue = promoInput.value;
  if (promoValue === promocode) {
    promoP.innerHTML = "discount: 10%";
  } else {
    promoP.innerHTML = "";
  }
  updateCart();
}

document.addEventListener("DOMContentLoaded", function () {
  const items = [
    { name: "Dumplings & Bao", price: 15, quantity: 0 },
    { name: "Bing (餅)", price: 10, quantity: 0 },
    { name: "Rice", price: 13, quantity: 0 },
    { name: "Noodles", price: 25, quantity: 0 },
    { name: "Small Eats", price: 17, quantity: 0 },
  ];

  const promoCode = "free.eat";
  const discountRate = 0.1;

  function updateCart() {
    let totalPrice = 0;
    let cartDetails = "";
    let itemCount = 0;

    items.forEach((item, index) => {
      totalPrice += item.price * item.quantity;
      itemCount += item.quantity;
      if (item.quantity > 0) {
        cartDetails += `<p>${item.name}: ${item.quantity}</p>`;
      }
      document.querySelectorAll(".shopping-heading-text-sum")[
        index
      ].textContent = item.quantity;
    });

    const hasDiscount = promoInput.value === promoCode;
    const discountedPrice = hasDiscount
      ? totalPrice * (1 - discountRate)
      : totalPrice;

    document.querySelector(
      ".selection-title"
    ).textContent = `your cart: ${itemCount}`;
    document.querySelector(
      ".selection-title-price"
    ).textContent = `total price: ${totalPrice}$`;
    if (hasDiscount) {
      document.querySelector(
        ".selection-title-discounted-price"
      ).textContent = `discounted price: ${discountedPrice.toFixed(2)}$`;
    } else {
      document.querySelector(".selection-title-discounted-price").textContent =
        "";
    }

    resultEl.innerHTML = cartDetails;
  }

  document.querySelectorAll(".shopping-plus").forEach((button, index) => {
    button.addEventListener("click", () => {
      items[index].quantity++;
      updateCart();
    });
  });

  document.querySelectorAll(".shopping-minuse").forEach((button, index) => {
    button.addEventListener("click", () => {
      if (items[index].quantity > 0) {
        items[index].quantity--;
        updateCart();
      }
    });
  });

  document
    .querySelector(".selection-title-reset")
    .addEventListener("click", () => {
      items.forEach((item) => {
        item.quantity = 0;
      });
      promoInput.value = "";
      promoP.innerHTML = "";
      updateCart();
    });

  updateCart();
});

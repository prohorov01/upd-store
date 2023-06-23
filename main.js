const categories = document.querySelectorAll(".categories li");
const productsContainer = document.querySelector(".products ul");
const productName = document.querySelector("#product-name");
const buyButton = document.querySelector("#buy-button");
const purchaseMessage = document.querySelector("#purchase-message");
const productInfo = document.querySelector(".product-info");

const products = {
  sports: ["Футбольний мяч", "Баскетбольний мяч", "Тенісна ракетка"],
  clothing: ["Футболка", "Шорти", "Куртка"],
  equipment: ["Гантелі", "Скакалка", "Гімнастичний мяч"],
};

let selectedProduct = null;

function showProducts(category) {
  productsContainer.innerHTML = "";

  products[category].forEach((product) => {
    const li = document.createElement("li");
    li.innerText = product;
    li.addEventListener("click", () => showProductInfo(product));
    productsContainer.appendChild(li);
  });

  document.querySelector(".products").style.display = "block";
  productInfo.style.display = "none";
}

function showProductInfo(productNameText) {
  productName.innerText = productNameText;
  buyButton.style.display = "block";
  purchaseMessage.innerText = "";
  productInfo.style.display = "block";

  selectedProduct = productNameText;

  displayProductInfo(productNameText);
}

function resetState() {
  productName.innerText = "";
  buyButton.style.display = "none";
  purchaseMessage.innerText = "";
  productInfo.style.display = "none";
  document.querySelector(".products").style.display = "none";
}

categories.forEach((category) => {
  category.addEventListener("click", () => {
    const selectedCategory = category.dataset.category;
    showProducts(selectedCategory);
  });
});

buyButton.addEventListener("click", () => {
  if (selectedProduct) {
    displayPurchaseMessage("Товар куплений");
  }
});

document.getElementById("buy-button").addEventListener("click", () => {
  if (selectedProduct) {
    document.querySelector(".form-container").style.display = "block";
  }
});

document.getElementById("orderForm").addEventListener("submit", (event) => {
  event.preventDefault();

  const fullName = document.getElementById("fullName").value;
  const city = document.getElementById("city").value;
  const postOffice = document.getElementById("postOffice").value;
  const paymentMethod = document.querySelector(
    'input[name="paymentMethod"]:checked'
  ).value;
  const quantity = document.getElementById("quantity").value;
  const comment = document.getElementById("comment").value;

  if (!fullName || !city || !postOffice || !paymentMethod || !quantity) {
    alert("Будь ласка, заповніть всі обов'язкові поля.");
  } else {
    const table = document.getElementById("orderTable");
    table.innerHTML = "";
    const rowNames = [
      "ПІБ покупця",
      "Місто",
      "Склад Нової пошти",
      "Спосіб оплати",
      "Кількість продукції",
      "Коментар",
    ];
    const rowValues = [
      fullName,
      city,
      postOffice,
      paymentMethod,
      quantity,
      comment,
    ];

    for (let i = 0; i < rowNames.length; i++) {
      const row = createTableRow(rowNames[i], rowValues[i]);
      table.appendChild(row);
    }

    document.querySelector(".order-info").style.display = "block";
  }
});

function createTableRow(name, value) {
  const row = document.createElement("tr");
  const cell1 = document.createElement("td");
  const cell2 = document.createElement("td");
  cell1.textContent = name;
  cell2.textContent = value;
  row.appendChild(cell1);
  row.appendChild(cell2);
  return row;
}

import "./scss/styles.scss";

import { CatalogModel } from "./components/models/CatalogModel";
import { CartModel } from "./components/models/CartModel";
import { BuyerModel } from "./components/models/BuyerModels";
import { Api } from "./components/base/Api";
import { ApiClient } from "./components/ApiClient";
import { API_URL } from "./utils/constants";
import { apiProducts } from "./utils/data";

console.log("--- Проверка работы моделей данных ---");

// Проверка CatalogModel
console.log(`\n=== CatalogModel===`);
const catalog = new CatalogModel();

catalog.setItems(apiProducts.items);
console.log("Сохранен массив товаров. Количество:", catalog.getItems().length);

console.log("Список всех товаров:", catalog.getItems());

const firstProductId = apiProducts.items[0].id;
const productById = catalog.getItem(firstProductId);
console.log(`Товар по ID "${firstProductId}:"`, productById);

if (productById) {
  catalog.setSelected(productById);
  console.log("Выбранный товар:", catalog.getSelected());
}

// Проверка CartModel
console.log(`\n=== CartModel===`);
const cart = new CartModel();

const item1 = apiProducts.items[0];
const item2 = apiProducts.items[1];

cart.addItem(item1);
cart.addItem(item2);
console.log("Список товаров добавленных в корзину:", cart.getItems());
console.log("Количество товаров в корзине:", cart.getCount());
console.log("Общая стоимость корзины:", cart.getTotal());

console.log(`Наличие товара "${item1.id}" в корзине:`, cart.hasItem(item1.id));
console.log(
  `Наличие отсутсвующих товаров "fake-id" в корзине:`,
  cart.hasItem("fake-id"),
);

cart.removeItem(item1);
console.log("После удаления одного товара. Список:", cart.getItems());
console.log("Новая общая стоимость:", cart.getTotal());

cart.clear();
console.log("После очистки корзины. Список:", cart.getItems());
console.log("Количество после очистки:", cart.getCount());

console.log("\n=== BuyerModel ===");
const buyer = new BuyerModel();

console.log("Начальные данные:", buyer.getData());
console.log("Валидация пустых полей:", buyer.validate());

buyer.setPayment("card");
buyer.setEmail("test@yandex.com");
buyer.setPhone("+799912345");
buyer.setAddress("г. Pостов-на-Дону ул.Пушкинская 154");

console.log("Заполненные данные:", buyer.getData());
console.log(
  "Валидация заполненных полей (должен быть пустой объект):",
  buyer.validate(),
);

buyer.setEmail("newemail@test.com");
console.log("После изменения только email:", buyer.getData());

// Очистка данных
buyer.clear();
console.log("После очистки данных покупателя:", buyer.getData());
console.log("Валидация после очистки:", buyer.validate());

console.log("\n--- Все модели работают независимо и корректно ---");

console.log("\n=== Подключение к серверу ===");

const api = new Api(API_URL, {
  headers: {
    "Content-Type": "application/json",
  },
});

const apiClient = new ApiClient(api);

apiClient
  .getProducts()
  .then((products) => {
    catalog.setItems(products);
    console.log(
      "✅ Товары загружены с сервера. Количество:",
      catalog.getItems().length,
    );
    console.log("Первый товар:", catalog.getItems()[0]);
  })
  .catch((err) => {
    console.error("❌ Ошибка загрузки:", err);
  });

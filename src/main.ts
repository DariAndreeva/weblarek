import "./scss/styles.scss";

import { CatalogModel } from "./components/models/CatalogModel";
import { CartModel } from "./components/models/CartModel";
import { BuyerModel } from "./components/models/BuyerModels";
import { EventEmitter } from "./components/base/Events";

import { Api } from "./components/base/Api";
import { ApiClient } from "./components/ApiClient";
import { API_URL } from "./utils/constants";

import { Modal } from "./components/modal/Modal";
import { Header } from "./components/header/Header";
import { Gallery } from "./components/gallery/Gallery";
import { Basket } from "./components/basket/Basket";
import { Success } from "./components/success/Success";
import { ProductCardPreview } from "./components/product/ProductCardPreview";
import { ProductCardFull } from "./components/product/ProductCardFull";
import { ProductCardBasket } from "./components/product/ProductCardBasket";
import { OrderForm } from "./components/form/OrderForm";
import { PaymentForm } from "./components/form/PaymentForm";

import { IProduct, IOrder, IOrderResult } from "./types";

import { cloneTemplate } from "./utils/utils";

const events = new EventEmitter();
const catalog = new CatalogModel(events);
const cart = new CartModel(events);
const buyer = new BuyerModel(events);

const modalContainer = document.querySelector(
  "#modal-container",
) as HTMLElement;
const galleryContainer = document.querySelector(".gallery") as HTMLElement;
const headerContainer = document.querySelector(".header") as HTMLElement;

const tplCardPreview = document.querySelector(
  "#card-catalog",
) as HTMLTemplateElement;
const tplCardFull = document.querySelector(
  "#card-preview",
) as HTMLTemplateElement;
const tplCardBasket = document.querySelector(
  "#card-basket",
) as HTMLTemplateElement;
const tplBasket = document.querySelector("#basket") as HTMLTemplateElement;
const tplOrder = document.querySelector("#order") as HTMLTemplateElement;
const tplContacts = document.querySelector("#contacts") as HTMLTemplateElement;
const tplSuccess = document.querySelector("#success") as HTMLTemplateElement;

const modal = new Modal(modalContainer, events);
const header = new Header(headerContainer, events);
const gallery = new Gallery(galleryContainer);
const basket = new Basket(cloneTemplate(tplBasket), events);
const success = new Success(cloneTemplate(tplSuccess), events);

const createCardPreview = (p: IProduct): HTMLElement =>
  new ProductCardPreview(cloneTemplate(tplCardPreview), events).render(p);

const createCardFull = (p: IProduct): HTMLElement =>
  new ProductCardFull(cloneTemplate(tplCardFull), events).render(p);

const createCardBasket = (p: IProduct, idx: number): HTMLElement =>
  new ProductCardBasket(cloneTemplate(tplCardBasket), events).render({
    ...p,
    index: idx,
  });

const orderForm = new OrderForm(cloneTemplate(tplOrder), events);
const paymentForm = new PaymentForm(cloneTemplate(tplContacts), events);

const api = new Api(API_URL, {
  headers: { "Content-Type": "application/json" },
});
const apiClient = new ApiClient(api);

events.on<{ id: string }>("товар:выбран", ({ id }) => {
  const product = catalog.getItem(id);
  if (product) {
    catalog.setSelected(product);
    // ✅ Передаём объект { content: ... }
    modal.render({ content: createCardFull(product) });
  }
});

events.on<{ id: string }>("товар:в-корзину", ({ id }) => {
  const product = catalog.getItem(id);
  if (product) {
    cart.addItem(product);
    header.setCounter(cart.getCount());
    modal.close();
  }
});

events.on("карточка:закрыта", () => modal.close());

events.on("корзина:открыта", () => {
  modal.render({
    content: basket.render({
      items: cart.getItems(),
      total: cart.getTotal(),
      renderItem: createCardBasket,
    }),
  });
});

events.on<{ id: string }>("товар:удалить", ({ id }) => {
  const product = catalog.getItem(id);
  if (product) {
    cart.removeItem(product);
    header.setCounter(cart.getCount());
    if (modalContainer.classList.contains("modal_active")) {
      modal.render({
        content: basket.render({
          items: cart.getItems(),
          total: cart.getTotal(),
          renderItem: createCardBasket,
        }),
      });
    }
  }
});

events.on("заказ:начать", () => {
  modal.render({ content: orderForm.render() });
});

events.on<{ field: string; value: string }>("форма:изменение", () => {});

events.on<Record<string, unknown>>("форма:отправка", (data) => {
  if ("address" in data) {
    if (data.payment === "card" || data.payment === "cash") {
      buyer.setPayment(data.payment);
    }
    if (data.address) buyer.setAddress(data.address as string);
    modal.render({ content: paymentForm.render() });
  } else if ("email" in data) {
    buyer.setEmail(data.email as string);
    buyer.setPhone(data.phone as string);

    const errors = buyer.validate();
    if (Object.keys(errors).length === 0) {
      const orderData: IOrder = {
        ...buyer.getData(),
        total: cart.getTotal(),
        items: cart.getItems().map((item: IProduct) => item.id),
      };

      apiClient
        .postOrder(orderData)
        .then((result: IOrderResult) => {
          modal.render({
            content: success.render({ total: result.total }),
          });
          cart.clear();
          header.setCounter(0);
          buyer.clear();
        })
        .catch((err) => console.error("Ошибка заказа:", err));
    }
  }
});

events.on("успех:закрыто", () => modal.close());

apiClient
  .getProducts()
  .then((response) => {
    catalog.setItems(response.items);
    gallery.render({
      items: catalog.getItems(),
      renderItem: createCardPreview,
    });
  })
  .catch((err) => console.error("Ошибка загрузки:", err));

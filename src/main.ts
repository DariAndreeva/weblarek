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

const orderForm = new OrderForm(cloneTemplate(tplOrder), events);
const paymentForm = new PaymentForm(cloneTemplate(tplContacts), events);

const api = new Api(API_URL, {
  headers: { "Content-Type": "application/json" },
});
const apiClient = new ApiClient(api);

events.on<{ field: string; value: string }>(
  "форма:изменение",
  ({ field, value }) => {
    if (field === "payment") buyer.setPayment(value as "card" | "cash");
    else if (field === "address") buyer.setAddress(value);
    else if (field === "email") buyer.setEmail(value);
    else if (field === "phone") buyer.setPhone(value);
  },
);

events.on("покупатель:изменился", () => {
  const data = buyer.getData();
  const validationErrors = buyer.validate();

  if (data.payment) orderForm.payment = data.payment;

  orderForm.render({ payment: data.payment, address: data.address });
  paymentForm.render({ email: data.email, phone: data.phone });

  const orderFormErrors: Record<string, string> = {};
  if (validationErrors.payment)
    orderFormErrors.payment = validationErrors.payment;
  if (validationErrors.address)
    orderFormErrors.address = validationErrors.address;

  const paymentFormErrors: Record<string, string> = {};
  if (validationErrors.email) paymentFormErrors.email = validationErrors.email;
  if (validationErrors.phone) paymentFormErrors.phone = validationErrors.phone;

  orderForm.errors = orderFormErrors;
  paymentForm.errors = paymentFormErrors;
});

events.on<{ id: string }>("товар:выбран", ({ id }) => {
  const product = catalog.getItem(id);
  if (!product) return;

  catalog.setSelected(product);

  modal.render({ content: createCardFull() });
});

events.on<{ id: string }>("card:buy", ({ id }) => {
  const product = catalog.getItem(id);
  if (!product) return;

  if (cart.hasItem(id)) {
    cart.removeItem(product);
  } else {
    cart.addItem(product);
  }

  header.setCounter(cart.getCount());
  modal.close();
});

events.on("карточка:закрыта", () => modal.close());

events.on("корзина:открыта", () => {
  const items = cart.getItems();

  const cardElements = items.map((item, index) =>
    new ProductCardBasket(
      cloneTemplate(tplCardBasket),
      events,

      () => events.emit<{ id: string }>("товар:удалить", { id: item.id }),
    ).render({ ...item, index: index + 1 }),
  );

  modal.render({
    content: basket.render({
      items: cardElements,
      total: cart.getTotal(),
    }),
  });
});

events.on<{ id: string }>("товар:удалить", ({ id }) => {
  const product = catalog.getItem(id);
  if (product) {
    cart.removeItem(product);
    header.setCounter(cart.getCount());

    if (modalContainer.classList.contains("modal_active")) {
      const items = cart.getItems();
      const cardElements = items.map((item, index) =>
        new ProductCardBasket(cloneTemplate(tplCardBasket), events, () =>
          events.emit<{ id: string }>("товар:удалить", { id: item.id }),
        ).render({ ...item, index: index + 1 }),
      );

      modal.render({
        content: basket.render({
          items: cardElements,
          total: cart.getTotal(),
        }),
      });
    }
  }
});

events.on("заказ:начать", () => modal.render({ content: orderForm.render() }));

events.on<Record<string, unknown>>("форма:отправка", (data) => {
  if ("address" in data) {
    if (data.payment === "card" || data.payment === "cash") {
      buyer.setPayment(data.payment as "card" | "cash");
    }
    if (typeof data.address === "string") buyer.setAddress(data.address);
    modal.render({ content: paymentForm.render() });
  } else if ("email" in data) {
    if (typeof data.email === "string") buyer.setEmail(data.email);
    if (typeof data.phone === "string") buyer.setPhone(data.phone);

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
          modal.render({ content: success.render({ total: result.total }) });
          cart.clear();
          header.setCounter(0);
          buyer.clear();
        })
        .catch(() => {});
    }
  }
});

events.on("успех:закрыто", () => modal.close());

apiClient
  .getProducts()
  .then((response) => {
    catalog.setItems(response.items);

    const cardElements = response.items.map((item) =>
      new ProductCardPreview(
        cloneTemplate(tplCardPreview),
        events,

        () => events.emit<{ id: string }>("товар:выбран", { id: item.id }),
      ).render(item),
    );

    gallery.render({ items: cardElements });
  })
  .catch(() => {});

function createCardFull(): HTMLElement {
  const selected = catalog.getSelected();
  if (!selected) return document.createElement("div");

  const cardFull = new ProductCardFull(
    cloneTemplate(tplCardFull),
    events,

    () => events.emit<{ id: string }>("card:buy", { id: selected.id }),
  );

  const content = cardFull.render(selected);

  if (selected.price === null) {
    cardFull.buyButtonText = "Недоступно";
    cardFull.buyButtonDisabled = true;
  } else if (cart.hasItem(selected.id)) {
    cardFull.buyButtonText = "Удалить из корзины";
    cardFull.buyButtonDisabled = false;
  } else {
    cardFull.buyButtonText = "Купить";
    cardFull.buyButtonDisabled = false;
  }

  return content;
}

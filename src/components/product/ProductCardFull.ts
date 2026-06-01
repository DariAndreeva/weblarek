import { IProduct } from "../../types";
import { ensureElement } from "../../utils/utils";
import { EventEmitter } from "../base/Events";
import { ProductCard } from "./ProductCard";

export class ProductCardFull extends ProductCard {
  protected _description: HTMLElement;
  protected _button: HTMLButtonElement;

  constructor(container: HTMLElement, events: EventEmitter) {
    super(container, events);

    this._description = ensureElement<HTMLElement>(".card__text", container);
    this._button = ensureElement<HTMLButtonElement>(".card__button", container);

    this._button.addEventListener("click", () => {
      if (this._button.disabled) return;

      const id = this.container.dataset.id;
      if (!id) return;

      const action = this._button.dataset.action;

      if (action === "remove") {
        this.events.emit<{ id: string }>("товар:удалить-из-модалки", { id });
      } else {
        this.events.emit<{ id: string }>("товар:в-корзину", { id });
      }
    });
  }

  set description(value: string) {
    this._description.textContent = value;
  }

  set price(value: number | null) {
    super.price = value;
    if (value === null) {
      this._button.disabled = true;
      this._button.textContent = "Недоступно для покупки";
      this._button.classList.add("card__button_disabled");
      this._button.removeAttribute("data-action");
    } else {
      this._button.disabled = false;
      this._button.classList.remove("card__button_disabled");
    }
  }

  configureButton(isInBasket: boolean): void {
    if (isInBasket) {
      this._button.textContent = "Удалить из корзины";
      this._button.classList.add("card__button_alt");
      this._button.dataset.action = "remove"; // 👈 Ключевой момент
    } else {
      this._button.textContent = "В корзину";
      this._button.classList.remove("card__button_alt");
      this._button.dataset.action = "add";
    }
  }

  render(product: IProduct): HTMLElement {
    this.container.dataset.id = product.id;
    this.title = product.title;
    this.category = product.category;
    this.price = product.price;
    this.image = product.image;
    this.description = product.description;

    this.configureButton(false);

    return this.container;
  }
}

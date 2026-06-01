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
      const id = this.container.dataset.id;
      if (id) {
        // 👈 Явно указываем тип данных события
        this.events.emit<{ id: string }>("товар:в-корзину", { id });
      }
    });
  }

  set description(value: string) {
    this._description.textContent = value;
  }

  set buttonDisabled(value: boolean) {
    this._button.disabled = value;
  }

  render(product: IProduct): HTMLElement {
    this.container.dataset.id = product.id;

    this.title = product.title;
    this.category = product.category;
    this.price = product.price;
    this.image = product.image;
    this.description = product.description;

    return this.container;
  }
}

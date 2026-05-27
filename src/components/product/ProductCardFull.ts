import { IEvents } from "../base/Events";
import { ProductCard } from "./ProductCard";

export class ProductCardFull extends ProductCard {
  protected _description: HTMLElement;
  protected _button: HTMLElement;

  constructor(container: HTMLElement, events: IEvents) {
    super(container, events);

    this._description = container.querySelector<HTMLElement>(".card__text")!;
    this._button = container.querySelector<HTMLElement>(".card__button")!;

    this._button.addEventListener("click", () => {
      const id = this.container.dataset.id || "";
      events.emit("товар: в-корзину", {});
    });
  }

  set description(value: string) {
    this._description.textContent = value;
  }

  set buttonDisabled(value: boolean) {
    this._button.disabled = value;
    this._button.classList.toggle("button_disabled", value);
  }
}

import { IProduct } from "../../types";
import { EventEmitter } from "../base/Events";
import { ProductCard } from "./ProductCard";

export class ProductCardFull extends ProductCard {
  protected descriptionElem: HTMLElement;
  protected button: HTMLButtonElement;

  constructor(container: HTMLElement, events: EventEmitter) {
    super(container, events);

    this.descriptionElem = container.querySelector(
      ".card__text",
    ) as HTMLElement;
    this.button = container.querySelector(".card__button") as HTMLButtonElement;

    this.button.addEventListener("click", () => {
      const id = this.container.dataset.id;
      if (id) {
        this.events.emit("товар:в-корзину", { id });
      }
    });
  }

  set description(value: string) {
    this.descriptionElem.textContent = value;
  }

  set isDisabled(value: boolean) {
    this.button.disabled = value;
    this.button.textContent = value ? "Уже в корзине" : "В корзину";
  }

  render(data: IProduct & { isDisabled?: boolean }): HTMLElement {
    this.container.dataset.id = data.id;

    this.isDisabled = data.isDisabled ?? false;

    const { isDisabled, ...productData } = data;

    return super.render(productData);
  }
}

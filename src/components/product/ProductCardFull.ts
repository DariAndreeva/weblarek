import { IProduct } from "../../types";
import { ensureElement } from "../../utils/utils";
import { EventEmitter } from "../base/Events";
import { ProductCard } from "./ProductCard";

export class ProductCardFull extends ProductCard {
  protected _description: HTMLElement;
  protected _button: HTMLButtonElement;

  constructor(
    container: HTMLElement,
    events: EventEmitter,
    private onButtonClick?: () => void,
  ) {
    super(container, events);

    this._description = ensureElement<HTMLElement>(".card__text", container);
    this._button = ensureElement<HTMLButtonElement>(".card__button", container);

    if (this.onButtonClick) {
      this._button.addEventListener("click", () => {
        if (this._button.disabled) return;

        this.onButtonClick?.();
      });
    }
  }

  set description(value: string) {
    this._description.textContent = value;
  }

  set buyButtonText(value: string) {
    this._button.textContent = value;
  }

  set buyButtonDisabled(value: boolean) {
    this._button.disabled = value;
  }

  set price(value: number | null) {
    super.price = value;
    if (value === null) {
      this._button.disabled = true;
      this._button.classList.add("card__button_disabled");
    } else {
      this._button.disabled = false;
      this._button.classList.remove("card__button_disabled");
    }
  }

  render(product: IProduct): HTMLElement {
    this.title = product.title;
    this.category = product.category;
    this.price = product.price;
    this.image = product.image;
    this.description = product.description;

    return this.container;
  }
}

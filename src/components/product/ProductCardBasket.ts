import { IProduct } from "../../types";
import { ensureElement } from "../../utils/utils";
import { EventEmitter } from "../base/Events";
import { ProductCard } from "./ProductCard";

export class ProductCardBasket extends ProductCard {
  protected deleteButton: HTMLButtonElement;
  protected indexElement: HTMLElement;

  constructor(
    container: HTMLElement,
    events: EventEmitter,
    private onDelete?: () => void,
  ) {
    super(container, events);

    this.deleteButton = ensureElement<HTMLButtonElement>(
      ".basket__item-delete",
      container,
    );
    this.indexElement = ensureElement<HTMLElement>(
      ".basket__item-index",
      container,
    );

    if (this.onDelete) {
      this.deleteButton.addEventListener("click", () => {
        this.onDelete?.();
      });
    }
  }

  set index(value: number) {
    this.indexElement.textContent = String(value);
  }

  render(product: IProduct & { index: number }): HTMLElement {
    this.title = product.title;
    this.category = product.category;
    this.price = product.price;
    this.image = product.image;
    this.index = product.index;

    return this.container;
  }
}

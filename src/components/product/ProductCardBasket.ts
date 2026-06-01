import { IProduct } from "../../types";
import { ensureElement } from "../../utils/utils";
import { EventEmitter } from "../base/Events";
import { ProductCard } from "./ProductCard";

interface IBasketItem extends IProduct {
  index: number;
}

export class ProductCardBasket extends ProductCard {
  protected _index: HTMLElement;
  protected _deleteBtn: HTMLButtonElement;

  constructor(container: HTMLElement, events: EventEmitter) {
    super(container, events);

    this._index = ensureElement<HTMLElement>(".basket__item-index", container);
    this._deleteBtn = ensureElement<HTMLButtonElement>(
      ".basket__item-delete",
      container,
    );

    this._deleteBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const id = this.container.dataset.id;
      if (id) {
        this.events.emit<{ id: string }>("товар:удалить", { id });
      }
    });
  }

  set index(value: number) {
    this._index.textContent = String(value);
  }

  render(product: IBasketItem): HTMLElement {
    this.container.dataset.id = product.id;
    this.title = product.title;
    this.category = product.category;
    this.price = product.price;
    this.image = product.image;
    this.index = product.index;
    return this.container;
  }
}

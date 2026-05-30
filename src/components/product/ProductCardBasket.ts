import { IProduct } from "../../types";
import { Component } from "../base/Component";
import { EventEmitter } from "../base/Events";

export class ProductCardBasket extends Component<IProduct & { index: number }> {
  protected indexElem: HTMLElement;
  protected titleElem: HTMLElement;
  protected priceElem: HTMLElement;
  protected deleteBtn: HTMLElement;
  protected events: EventEmitter;

  constructor(container: HTMLElement, events: EventEmitter) {
    super(container);
    this.events = events;

    this.indexElem = container.querySelector(
      "basket__item-index",
    ) as HTMLElement;
    this.titleElem = container.querySelector(".card__title") as HTMLElement;
    this.priceElem = container.querySelector("card__price") as HTMLElement;
    this.deleteBtn = container.querySelector(
      "basket__item-delete",
    ) as HTMLElement;

    this.deleteBtn.addEventListener("click", () => {
      const id = this.container.dataset.id;
      if (id) {
        this.events.emit("товар:удалить", { id });
      }
    });
  }

  set index(value: number) {
    this.indexElem.textContent = String(value);
  }

  set title(value: string) {
    this.titleElem.textContent = value;
  }

  set price(value: number | null) {
    this.priceElem.textContent = value ? `${value} синапсов` : "Бесценно";
  }

  render(data: IProduct & { index: number }): HTMLElement {
    this.container.dataset.id = data.id;
    return super.render(data);
  }
}

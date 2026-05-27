import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

export class Basket extends Component<void> {
  protected _list: HTMLElement;
  protected _total: HTMLElement;
  protected _orderBtn: HTMLElement;

  constructor(container: HTMLElement, events: IEvents) {
    super(container);
    this._list = container.querySelector<HTMLElement>("basket__list")!;
    this._total = container.querySelector<HTMLElement>("basket__price")!;
    this._orderBtn = container.querySelector<HTMLElement>("basket__bitton")!;

    this._orderBtn.addEventListener("click", () => {
      events.emit("заказ:начать", {});
    });
  }

  setItems(items: HTMLElement[]) {
    this._list.innerHTML = "";
    items.forEach((item) => this._list.appendChild(item));
  }

  set total(value: number) {
    this._total.textContent = `${value} синапсов`;
  }
}

import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

export class Header extends Component<void> {
  protected _counter: HTMLElement;

  constructor(container: HTMLElement, events: IEvents) {
    super(container);

    this._counter = container.querySelector<HTMLElement>(
      "header__basket-counter",
    )!;

    const basketBtn = container.querySelector<HTMLElement>(".header__basket");
    if (basketBtn) {
      basketBtn.addEventListener("click", () => {
        events.emit("корзина: открыта", {});
      });
    }
  }
  setCounter(value: number) {
    this._counter.textContent = String(value);
  }
}

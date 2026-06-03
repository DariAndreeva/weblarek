import { Component } from "../base/Component";
import { EventEmitter } from "../base/Events";
import { ensureElement } from "../../utils/utils";

interface IBasketData {
  items: HTMLElement[];
  total: number;
}

export class Basket extends Component<IBasketData> {
  protected listElement: HTMLElement;
  protected totalElement: HTMLElement;
  protected checkoutButton: HTMLButtonElement;

  constructor(
    container: HTMLElement,
    protected events: EventEmitter,
  ) {
    super(container);

    this.listElement = ensureElement<HTMLElement>(".basket__list", container);
    this.totalElement = ensureElement<HTMLElement>(".basket__price", container);
    this.checkoutButton = ensureElement<HTMLButtonElement>(
      ".basket__button",
      container,
    );

    this.checkoutButton.addEventListener("click", () => {
      this.events.emit("заказ:начать");
    });
  }

  render(data: IBasketData): HTMLElement {
    if (data?.items) {
      this.listElement.replaceChildren(...data.items);
    }
    if (data?.total !== undefined) {
      this.totalElement.textContent = `${data.total} синапсов`;
    }
    return this.container;
  }
}

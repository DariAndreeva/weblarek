import { Component } from "../base/Component";
import { EventEmitter } from "../base/Events";
import { ensureElement } from "../../utils/utils";
import { IProduct } from "../../types";

interface IBasketData {
  items: IProduct[];
  total: number;
  renderItem: (item: IProduct, index: number) => HTMLElement;
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

  render(data?: Partial<IBasketData>): HTMLElement {
    if (data?.items && data?.renderItem) {
      this.listElement.replaceChildren(
        ...data.items.map((item, index) => data.renderItem!(item, index + 1)),
      );
    }
    if (data?.total !== undefined) {
      this.totalElement.textContent = `${data.total} синапсов`;
    }
    return this.container;
  }
}

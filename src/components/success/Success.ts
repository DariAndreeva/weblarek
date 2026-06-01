import { Component } from "../base/Component";
import { EventEmitter } from "../base/Events";
import { ensureElement } from "../../utils/utils";
import { IOrderResult } from "../../types";

export class Success extends Component<IOrderResult> {
  protected descriptionElement: HTMLElement;
  protected closeButton: HTMLButtonElement;

  constructor(
    container: HTMLElement,
    protected events: EventEmitter,
  ) {
    super(container);
    this.descriptionElement = ensureElement<HTMLElement>(
      ".order-success__description",
      container,
    );
    this.closeButton = ensureElement<HTMLButtonElement>(
      ".order-success__close",
      container,
    );

    this.closeButton.addEventListener("click", () => {
      this.events.emit("успех:закрыто");
    });
  }

  render(data?: Partial<IOrderResult>): HTMLElement {
    if (data?.total !== undefined) {
      this.descriptionElement.textContent = `Списано ${data.total} синапсов`;
    }
    return this.container;
  }
}

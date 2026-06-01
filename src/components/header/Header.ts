import { Component } from "../base/Component";
import { EventEmitter } from "../base/Events";
import { ensureElement } from "../../utils/utils";

export class Header extends Component<void> {
  protected counterElement: HTMLElement;
  protected basketButton: HTMLElement;

  constructor(
    container: HTMLElement,
    protected events: EventEmitter,
  ) {
    super(container);

    this.counterElement = ensureElement<HTMLElement>(
      ".header__basket-counter",
      container,
    );
    this.basketButton = ensureElement<HTMLElement>(
      ".header__basket",
      container,
    );

    this.basketButton.addEventListener("click", () => {
      this.events.emit("корзина:открыта");
    });
  }

  setCounter(count: number): void {
    if (this.counterElement) {
      this.counterElement.textContent = String(count);
    }
  }
}

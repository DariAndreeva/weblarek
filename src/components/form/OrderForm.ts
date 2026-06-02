import { Form } from "./Form";
import { EventEmitter } from "../base/Events";
import { ensureElement } from "../../utils/utils";

export class OrderForm extends Form<Record<string, unknown>> {
  protected cardButton: HTMLButtonElement;
  protected cashButton: HTMLButtonElement;

  constructor(container: HTMLElement, events: EventEmitter) {
    super(container, events);

    this.cardButton = ensureElement<HTMLButtonElement>(
      '[name="card"]',
      container,
    );
    this.cashButton = ensureElement<HTMLButtonElement>(
      '[name="cash"]',
      container,
    );

    this.cardButton.addEventListener("click", () => {
      this.touched = true;

      this.events.emit<{ field: string; value: string }>("форма:изменение", {
        field: "payment",
        value: "card",
      });
    });

    this.cashButton.addEventListener("click", () => {
      this.touched = true;

      this.events.emit<{ field: string; value: string }>("форма:изменение", {
        field: "payment",
        value: "cash",
      });
    });
  }

  set payment(value: string) {
    this.cardButton.classList.toggle("button_alt-active", value === "card");
    this.cashButton.classList.toggle("button_alt-active", value === "cash");
  }
}

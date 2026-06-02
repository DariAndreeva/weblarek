import { Form } from "./Form";
import { EventEmitter } from "../base/Events";
import { ensureElement } from "../../utils/utils";

export class PaymentForm extends Form<Record<string, unknown>> {
  protected emailInput: HTMLInputElement;
  protected phoneInput: HTMLInputElement;

  constructor(container: HTMLElement, events: EventEmitter) {
    super(container, events);

    this.emailInput = ensureElement<HTMLInputElement>(
      '[name="email"]',
      container,
    );
    this.phoneInput = ensureElement<HTMLInputElement>(
      '[name="phone"]',
      container,
    );
  }
}

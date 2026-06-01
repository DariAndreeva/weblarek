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

  protected validateFields(): Record<string, string> {
    const errors: Record<string, string> = {};

    if (!this.emailInput.value.trim()) {
      errors.email = "Укажите email";
    } else if (!this.emailInput.value.includes("@")) {
      errors.email = "Некорректный формат email";
    }

    if (!this.phoneInput.value.trim()) {
      errors.phone = "Укажите телефон";
    } else if (this.phoneInput.value.replace(/\D/g, "").length < 11) {
      errors.phone = "Некорректный формат телефона";
    }

    return errors;
  }

  render(data?: Record<string, unknown>): HTMLElement {
    if (data) {
      if (data.email) this.emailInput.value = String(data.email);
      if (data.phone) this.phoneInput.value = String(data.phone);
    }
    return super.render(data);
  }
}

import { Form } from "./Form";
import { EventEmitter } from "../base/Events";
import { ensureAllElements, ensureElement } from "../../utils/utils";

export class OrderForm extends Form<Record<string, unknown>> {
  protected paymentButtons: HTMLButtonElement[];
  protected addressInput: HTMLInputElement;
  protected selectedPayment: string | null = null;

  constructor(container: HTMLElement, events: EventEmitter) {
    super(container, events);

    this.paymentButtons = ensureAllElements<HTMLButtonElement>(
      ".order__buttons button",
      container,
    );
    this.addressInput = ensureElement<HTMLInputElement>(
      '[name="address"]',
      container,
    );

    this.paymentButtons.forEach((button) => {
      button.addEventListener("click", () => {
        this.selectPayment(button.name);
      });
    });
  }

  protected selectPayment(payment: string): void {
    this.selectedPayment = payment;

    this.paymentButtons.forEach((btn) => {
      btn.classList.toggle("button_alt-active", btn.name === payment);
    });

    this.events.emit<{ field: string; value: string }>("форма:изменение", {
      field: "payment",
      value: payment,
    });

    this.validate();
  }

  protected validateFields(): Record<string, string> {
    const errors: Record<string, string> = {};

    if (!this.selectedPayment) {
      errors.payment = "Выберите способ оплаты";
    }

    if (!this.addressInput.value.trim()) {
      errors.address = "Укажите адрес доставки";
    }

    return errors;
  }

  protected getData(): Record<string, unknown> {
    const data = super.getData();

    data.payment = this.selectedPayment;
    return data;
  }

  render(data?: Record<string, unknown>): HTMLElement {
    if (data && data.payment) {
      this.selectPayment(data.payment as string);
    }
    if (data && data.address) {
      this.addressInput.value = String(data.address);
    }
    return super.render(data);
  }
}

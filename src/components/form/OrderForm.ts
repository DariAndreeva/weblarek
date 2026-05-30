import { IBuyer, TBuyerErrors, TPayment } from "../../types";
import { EventEmitter } from "../base/Events";
import { Form } from "./Form";

interface IOrdenFormData extends Pick<IBuyer, "address" | "payment"> {}

export class IOrderFormData extends Form<IOrdenFormData> {
  protected paymentButton: NodeListOf<HTMLButtonElement>;

  constructor(container: HTMLElement, events: EventEmitter) {
    super(container, events);

    this.paymentButton = container.querySelectorAll(
      'button[name="card"], button[name = "cash"]',
    );

    this.paymentButton.forEach((btn) => {
      btn.addEventListener("click", () => {
        const paymentType = btn.name as TPayment;
        this.selectPayment(paymentType);
      });
    });
  }

  protected selectPayment(type: TPayment): void {
    this.paymentButton.forEach((btn) => {
      btn.classList.toggle("button_all-active", btn.name === type);
    });
    this.events.emit("форма:изменение", {
      field: "payment",
      value: type,
      valid: true,
    });
  }

  set address(value: string) {
    const input = this.container.querySelector(
      'input[name="address"]',
    ) as HTMLInputElement;
    if (input) input.value = value;
  }

  render(errors: TBuyerErrors = {}): HTMLElement {
    return super.render(errors);
  }
}

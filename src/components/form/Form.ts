import { TBuyerErrors } from "../../types";
import { Component } from "../base/Component";
import { EventEmitter } from "../base/Events";

export abstract class Form<T> extends Component<T> {
  protected submitBtn: HTMLButtonElement;
  protected errorsElem: HTMLElement;
  protected events: EventEmitter;

  constructor(container: HTMLElement, events: EventEmitter) {
    super(container);

    this.events = events;
    this.submitBtn = container.querySelector(
      "button[type=submit]",
    ) as HTMLButtonElement;
    this.errorsElem = container.querySelector(".form__errors") as HTMLElement;

    container.addEventListener("input", (e: Event) => {
      const target = e.target as HTMLInputElement;
      const field = target.name as keyof T;
      const value = target.value;
      this.events.emit("форма:изменения", { field, value, valid: true });
    });
  }
  set valid(value: boolean) {
    this.submitBtn.disabled = !value;
  }
  set errorsText(value: string) {
    this.errorsElem.textContent = value;
  }
  render(errors: TBuyerErrors = {}): HTMLElement {
    const fields = Object.keys(errors) as Array<keyof TBuyerErrors>;
    const hasErrors = fields.length > 0;

    this.valid = !hasErrors;
    this.errorsText = hasErrors ? fields.map((f) => errors[f]).join(" :") : "";

    return super.render();
  }
}

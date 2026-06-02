import { Component } from "../base/Component";
import { EventEmitter } from "../base/Events";
import { ensureAllElements, ensureElement } from "../../utils/utils";

export abstract class Form<T> extends Component<T> {
  protected submit: HTMLButtonElement;
  protected errorsElement: HTMLElement | null;
  protected inputs: HTMLInputElement[];

  protected touched: boolean = false;

  constructor(
    container: HTMLElement,
    protected events: EventEmitter,
  ) {
    super(container);

    this.submit = ensureElement<HTMLButtonElement>(
      '[type="submit"]',
      container,
    );
    this.errorsElement = container.querySelector<HTMLElement>(".form__errors");
    this.inputs = ensureAllElements<HTMLInputElement>(
      ".form__input",
      container,
    );

    this.inputs.forEach((input) => {
      input.addEventListener("input", () => {
        this.touched = true;

        this.events.emit<{ field: string; value: string }>("форма:изменение", {
          field: input.name,
          value: input.value,
        });
      });
    });

    this.container.addEventListener("submit", (event: Event) => {
      event.preventDefault();
      this.events.emit("форма:отправка", this.getData());
    });
  }

  set errors(errors: Record<string, string>) {
    if (this.errorsElement) {
      if (this.touched && Object.values(errors).length > 0) {
        this.errorsElement.textContent = Object.values(errors).join("; ");
      } else {
        this.errorsElement.textContent = "";
      }
    }

    this.submit.disabled = Object.keys(errors).length > 0;
  }

  protected getData(): Record<string, unknown> {
    const data: Record<string, unknown> = {};
    this.inputs.forEach((input) => {
      if (input.name) {
        data[input.name] = input.value;
      }
    });
    return data;
  }

  protected setFormData(data: Record<string, unknown>) {
    Object.keys(data).forEach((key) => {
      const input = this.container.querySelector(
        `[name="${key}"]`,
      ) as HTMLInputElement;
      if (input) {
        input.value = String(data[key]);
      }
    });
  }

  render(data?: Partial<T>): HTMLElement {
    if (data) {
      this.setFormData(data as Record<string, unknown>);
    }
    return super.render(data);
  }
}

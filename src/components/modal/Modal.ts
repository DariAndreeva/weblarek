import { Component } from "../base/Component";
import { EventEmitter } from "../base/Events";

export class Modal extends Component<{}> {
  protected closeBtn: HTMLButtonElement;
  protected content: HTMLElement;
  protected events: EventEmitter;

  constructor(container: HTMLElement, events: EventEmitter) {
    super(container);
    this.events = events;

    this.closeBtn = this.container.querySelector(
      "button.modal__close",
    ) as HTMLButtonElement;
    this.content = this.container.querySelector(
      "modal__content",
    ) as HTMLElement;

    this.closeBtn.addEventListener("click", () => this.close());

    this.container.addEventListener("click", (evt: MouseEvent) => {
      if (evt.target === this.container) this.close();
    });
  }

  setContent(content: HTMLElement): void {
    this.container.innerHTML = "";
    this.container.appendChild(content);
  }

  open(): void {
    this.container.classList.add("modal_active");
  }

  close(): void {
    this.container.classList.remove("modal_active");
    this.events.emit("модалка:закрыта");
  }

  render(): HTMLElement {
    return this.container;
  }
}

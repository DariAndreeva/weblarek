import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

export class Modal extends Component<void> {
  protected _content: HTMLElement;
  protected _events: IEvents;

  constructor(container: HTMLElement, events: IEvents) {
    super(container);
    this._events = events;
    this._content = container.querySelector<HTMLElement>(".modal__content")!;

    const closeBtn = container.querySelector<HTMLElement>(".modal__close");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => this.close());
    }

    container.addEventListener("click", (e: Event) => {
      if (e.target === container) {
        this.close();
      }
    });
  }

  setContent(content: HTMLElement): HTMLElement {
    this.container.innerHTML = "";
    this.container.appendChild(content);
    return this.render();
  }

  open(): void {
    this.container.classList.add("modal_active");
  }

  close(): void {
    this.container.classList.remove("modal_active");
    this._events.emit("модалка:закрыта", {});
  }
}

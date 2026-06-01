import { Component } from "../base/Component";
import { EventEmitter } from "../base/Events";
import { ensureElement } from "../../utils/utils";

interface IModalData {
  content: HTMLElement;
}

export class Modal extends Component<IModalData> {
  protected _closeButton: HTMLButtonElement;
  protected _content: HTMLElement;

  constructor(
    container: HTMLElement,
    protected events: EventEmitter,
  ) {
    super(container);
    this._closeButton = ensureElement<HTMLButtonElement>(
      ".modal__close",
      container,
    );
    this._content = ensureElement<HTMLElement>(".modal__content", container);

    this._closeButton.addEventListener("click", () => this.close());
    this.container.addEventListener("click", (e: MouseEvent) => {
      if ((e.target as Node) === this.container) this.close();
    });
  }

  set content(value: HTMLElement) {
    this._content.replaceChildren(value);
  }

  open(): void {
    this.container.classList.add("modal_active");
  }

  close(): void {
    this.container.classList.remove("modal_active");
    this._content.replaceChildren();
    this.events.emit("модалка:закрыта");
  }

  render(data?: Partial<IModalData>): HTMLElement {
    if (data?.content) {
      this.content = data.content;
    }
    this.open();
    return this.container;
  }
}

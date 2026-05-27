import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

export class Gallery extends Component<void> {
  constructor(container: HTMLElement, events: IEvents) {
    super(container);
  }

  set items(items: HTMLElement[]) {
    this.container.innerHTML = "";
    items.forEach((item) => this.container.appendChild(item));
  }
}

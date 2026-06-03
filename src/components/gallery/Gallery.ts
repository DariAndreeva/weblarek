import { Component } from "../base/Component";

interface IGaleryData {
  items: HTMLElement[];
}

export class Gallery extends Component<IGaleryData> {
  constructor(container: HTMLElement) {
    super(container);
  }

  render(data: IGaleryData): HTMLElement {
    if (data?.items) {
      this.container.replaceChildren(...data.items);
    }
    return this.container;
  }
}

import { IProduct } from "../../types";
import { Component } from "../base/Component";

interface IGaleryData {
  items: IProduct[];
  renderItem: (product: IProduct) => HTMLElement;
}

export class Gallery extends Component<IGaleryData> {
  constructor(container: HTMLElement) {
    super(container);
  }

  render(data?: Partial<IGaleryData>): HTMLElement {
    if (data?.items && data?.renderItem) {
      this.container.replaceChildren(
        ...data.items.map((item) => data.renderItem!(item)),
      );
    }
    return this.container;
  }
}

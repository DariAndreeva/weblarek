import { IProduct } from "../../types";
import { EventEmitter } from "../base/Events";
import { ProductCard } from "./ProductCard";

export class ProductCardPreview extends ProductCard {
  constructor(
    container: HTMLElement,
    events: EventEmitter,
    private onCardClick?: () => void,
  ) {
    super(container, events);

    if (this.onCardClick) {
      this.container.addEventListener("click", () => {
        this.onCardClick?.();
      });
    }
  }

  render(data: IProduct): HTMLElement {
    return super.render(data);
  }
}

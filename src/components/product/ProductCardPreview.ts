import { IProduct } from "../../types";
import { EventEmitter } from "../base/Events";
import { ProductCard } from "./ProductCard";

export class ProductCardPreview extends ProductCard {
  constructor(
    container: HTMLElement,
    events: EventEmitter,
    private onCardClick?: (id: string) => void,
  ) {
    super(container, events);

    if (this.onCardClick) {
      this.container.addEventListener("click", () => {
        const id = this.container.dataset.id;
        if (id) {
          this.onCardClick?.(id);
        }
      });
    }
  }

  render(data: IProduct): HTMLElement {
    this.container.dataset.id = data.id;
    return super.render(data);
  }
}

import { IEvents } from "../base/Events";
import { ProductCard } from "./ProductCard";

export class ProductCardPreview extends ProductCard {
  constructor(container: HTMLElement, events: IEvents) {
    super(container, events);

    this.container.addEventListener("click", () => {
      const id = this.container.dataset.id || "";
      events.emit("товар:выбран", { id });
    });
  }
}

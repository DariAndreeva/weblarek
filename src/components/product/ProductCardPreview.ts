import { IProduct } from "../../types";
import { EventEmitter } from "../base/Events";
import { ProductCard } from "./ProductCard";

export class ProductCardPreview extends ProductCard {
  protected buyButton: HTMLButtonElement | null = null;
  protected isInBasket: boolean = false;

  constructor(container: HTMLElement, events: EventEmitter) {
    super(container, events);

    this.buyButton =
      container.querySelector<HTMLButtonElement>(".card__button");

    if (this.buyButton) {
      this.buyButton.addEventListener("click", (e) => {
        e.stopPropagation();

        const id = this.container.dataset.id;
        if (!id) return;

        if (this.isInBasket) {
          this.events.emit<{ id: string }>("товар:удалить-из-каталога", { id });
        } else {
          this.events.emit<{ id: string }>("товар:в-корзину", { id });
        }
      });
    }

    this.container.addEventListener("click", () => {
      const id = this.container.dataset.id;
      if (id) {
        this.events.emit<{ id: string }>("товар:выбран", { id });
      }
    });
  }

  setInBasket(isInBasket: boolean): void {
    this.isInBasket = isInBasket;

    if (this.buyButton) {
      this.buyButton.textContent = isInBasket
        ? "Удалить из корзины"
        : "В корзину";

      if (isInBasket) {
        this.buyButton.classList.add("card__button_alt");
      } else {
        this.buyButton.classList.remove("card__button_alt");
      }
    }
  }

  render(data: IProduct): HTMLElement {
    this.container.dataset.id = data.id;

    this.setInBasket(false);

    return super.render(data);
  }
}

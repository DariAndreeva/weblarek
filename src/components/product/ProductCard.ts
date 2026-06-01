// src/components/product/ProductCard.ts
import { Component } from "../base/Component";
import { EventEmitter } from "../base/Events";
import { ensureElement } from "../../utils/utils";
import { CDN_URL, categoryMap } from "../../utils/constants";
import { IProduct } from "../../types";

export abstract class ProductCard extends Component<IProduct> {
  protected titleElement: HTMLElement;
  protected priceElement: HTMLElement;

  protected categoryElement: HTMLElement | null;
  protected imageElement: HTMLImageElement | null;

  constructor(
    container: HTMLElement,
    protected events: EventEmitter,
  ) {
    super(container);

    this.titleElement = ensureElement<HTMLElement>(".card__title", container);
    this.priceElement = ensureElement<HTMLElement>(".card__price", container);

    this.categoryElement =
      container.querySelector<HTMLElement>(".card__category");
    this.imageElement =
      container.querySelector<HTMLImageElement>(".card__image");
  }

  set title(value: string) {
    this.titleElement.textContent = value;
  }

  set category(value: string) {
    if (this.categoryElement) {
      this.categoryElement.textContent = value;
      const className = (categoryMap as any)[value];
      if (className) {
        this.categoryElement.className = `card__category ${className}`;
      }
    }
  }

  set price(value: number | null) {
    this.priceElement.textContent = value ? `${value} синапсов` : "Бесценно";
  }

  set image(value: string) {
    if (this.imageElement) {
      this.setImage(
        this.imageElement,
        `${CDN_URL}${value}`,
        this.titleElement.textContent ?? undefined,
      );
    }
  }
}

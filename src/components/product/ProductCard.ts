import { Component } from "../base/Component";
import { EventEmitter } from "../base/Events";
import { categoryMap, CDN_URL } from "../../utils/constants";
import { IProduct } from "../../types";

export abstract class ProductCard extends Component<IProduct> {
  protected titleElem: HTMLElement;
  protected categoryElem: HTMLElement;
  protected priceElem: HTMLElement;
  protected imageElem: HTMLImageElement;

  protected events: EventEmitter;

  constructor(container: HTMLElement, events: EventEmitter) {
    super(container);
    this.events = events;
    this.titleElem = container.querySelector(".card__title") as HTMLElement;
    this.categoryElem = container.querySelector(
      ".card__category",
    ) as HTMLElement;
    this.priceElem = container.querySelector(".card__price") as HTMLElement;
    this.imageElem = container.querySelector(
      ".card__image",
    ) as HTMLImageElement;
  }

  set title(value: string) {
    this.titleElem.textContent = value;
  }

  set category(value: string) {
    this.categoryElem.textContent = value;
    Object.values(categoryMap).forEach((className) => {
      this.categoryElem.classList.remove(className);
    });
    const className =
      categoryMap[value as keyof typeof categoryMap] || categoryMap["другое"];
    if (className) {
      this.categoryElem.classList.add(className);
    }
  }
  set price(value: number | null) {
    this.priceElem.textContent = value ? `${value} синапсов` : "Бесценно";
  }

  set image(value: string) {
    this.setImage(
      this.imageElem,
      `${CDN_URL}/${value}`,
      this.titleElem.textContent || "",
    );
  }
}

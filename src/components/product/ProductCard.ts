import { Component } from "../base/Component";
import { IEvents } from "../base/Events";
import { categoryMap } from "../../utils/constants";

export abstract class ProductCard extends Component<{
  id?: string;
  title?: string;
  category?: string;
  price?: number | null;
  image?: string;
}> {
  protected _title: HTMLElement;
  protected _category: HTMLElement;
  protected _price: HTMLElement;
  protected _image: HTMLImageElement;
  protected _events: IEvents;

  constructor(container: HTMLElement, events: IEvents) {
    super(container);
    this._events = events;
    this._title = container.querySelector<HTMLElement>(".card__title")!;
    this._category = container.querySelector<HTMLElement>(".card__category")!;
    this._price = container.querySelector<HTMLElement>(".card__price")!;
    this._image = container.querySelector<HTMLImageElement>(".card__image")!;
  }

  set id(value: string) {
    this.container.dataset.id = value;
  }

  set title(value: string) {
    this._title.textContent = value;
  }

  set category(value: string) {
    this._category.textContent = value;
    const cssClass = categoryMap[value] || categoryMap["другое"];
    this._category.className = cssClass;
  }

  set price(value: number | null) {
    this._price.textContent = value === null ? "Бесценно" : `${value} синапсов`;
  }

  set image(value: string) {
    this.setImage(this._image, value, this._title.textContent || "");
  }
}

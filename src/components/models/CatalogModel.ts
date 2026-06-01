import { IProduct } from "../../types";
import { EventEmitter } from "../base/Events";

export class CatalogModel {
  protected items: IProduct[] = [];
  protected selected: IProduct | null = null;

  protected events: EventEmitter;

  constructor(events: EventEmitter) {
    this.events = events;
    this.events.emit("каталог:изменился", { items: this.items });
  }

  setItems(items: IProduct[]): void {
    this.items = items;
  }

  getItems(): IProduct[] {
    return this.items;
  }

  getItem(id: string): IProduct | undefined {
    return this.items.find((item) => item.id === id);
  }

  setSelected(item: IProduct): void {
    this.selected = item;
    this.events.emit("товар:выбран-в-модели", { item: this.selected });
  }

  getSelected(): IProduct | null {
    return this.selected;
  }
}

import { IProduct } from "../../types";
import { EventEmitter } from "../base/Events";

export class CartModel {
  protected items: IProduct[] = [];
  protected events: EventEmitter;

  constructor(events: EventEmitter) {
    this.events = events;
  }

  getItems(): IProduct[] {
    return this.items;
  }

  addItem(item: IProduct): void {
    this.items.push(item);
    this.events.emit("корзина:изменилась", {
      items: this.items,
      total: this.getTotal(),
      count: this.getCount(),
    });
  }

  removeItem(item: IProduct): void {
    this.items = this.items.filter((i) => i.id != item.id);
    this.events.emit("корзина:изменилась", {
      items: this.items,
      total: this.getTotal(),
      count: this.getCount(),
    });
  }

  clear(): void {
    this.items = [];
    this.events.emit("корзина:изменилась", {
      items: this.items,
      total: 0,
      count: 0,
    });
  }

  getTotal(): number {
    return this.items.reduce((sum, item) => sum + (item.price ?? 0), 0);
  }

  getCount(): number {
    return this.items.length;
  }

  hasItem(id: string): boolean {
    return this.items.some((item) => item.id === id);
  }
}

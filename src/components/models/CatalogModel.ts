import { IProduct } from "../../types";

export class CatalogModel {
  protected _items: IProduct[] = [];
  protected _selected: IProduct | null = null;

  setItems(items: IProduct[]): void {
    this._items = items;
  }

  getItems(): IProduct[] {
    return this._items;
  }

  getItem(id: string): IProduct | undefined {
    return this._items.find((item) => item.id === id);
  }

  setSelected(item: IProduct): void {
    this._selected = item;
  }

  getSelected(): IProduct | null {
    return this._selected;
  }
}

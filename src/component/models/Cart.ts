import { IProduct, IPlayment } from "../../types";

export class Plament implements IPlayment {
  items: IProduct[];
  total: number;

  constructor(data?: Partial<IPlayment>) {
    this.items = data?.items ?? [];
    this.total = data?.total ?? 0;
  }
}

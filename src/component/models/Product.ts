import { IProduct } from "../../types";

export class Product implements IProduct {
  id: string;
  title: string;
  price: number | null;
  description: string;
  category: string;
  image: string;

  constructor(data: IProduct) {
    this.id = data.id;
    this.title = data.title;
    this.price = data.price;
    this.description = data.description;
    this.category = data.category;
    this.image = data.image;
  }
}

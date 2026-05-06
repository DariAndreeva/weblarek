export type ApiPostMethods = "POST" | "PUT" | "DELETE";

export interface IApi {
  get<T extends object>(uri: string): Promise<T>;
  post<T extends object>(
    uri: string,
    data: object,
    method?: ApiPostMethods,
  ): Promise<T>;
}

export interface IProduct {
  id: string;
  title: string;
  price: number | null;
  description: string;
  category: string;
  image: string;
}

export interface ICart {
  items: IProduct[];
  total: number;
}

export interface IOrder {
  payment: "online" | "offline";
  email: string;
  phone: string;
  address: string;
}

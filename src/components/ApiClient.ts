import { IApi, IOrderResult, IProduct, IProductsResponse } from "../types";

export class ApiClient {
  protected api: IApi;

  constructor(api: IApi) {
    this.api = api;
  }

  getProducts(): Promise<IProduct[]> {
    return this.api
      .get<IProductsResponse>(`/product/`)
      .then((data) => data.items);
  }

  postOrder(order: IOrder): Promise<IOrderResult> {
    return this.api.post<IOrderResult>(`/order/`, order);
  }
}

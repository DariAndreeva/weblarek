import {
  IApi,
  IProduct,
  IProductsResponse,
  IOrder,
  IOrderResult,
} from "../types";

export class ApiClient {
  private api: IApi;

  constructor(api: IApi) {
    this.api = api;
  }

  getProducts(): Promise<IProduct[]> {
    return this.api
      .get<IProductsResponse>("/product/")
      .then((response) => response.items);
  }

  postOrder(order: IOrder): Promise<IOrderResult> {
    return this.api.post<IOrderResult>("/order/", order);
  }
}

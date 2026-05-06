import { IBuyer, TPayment } from "../../types";

export class Buyer implements IBuyer {
  payment: TPayment;
  email: string;
  phone: string;
  address: string;

  constructor(data?: Partial<IBuyer>) {
    this.payment = data?.payment ?? "offline";
    this.email = data?.email ?? "";
    this.phone = data?.phone ?? "";
    this.address = data?.address ?? "";
  }
}

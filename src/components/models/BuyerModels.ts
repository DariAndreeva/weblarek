import { IBuyer, TBuyerErrors, TPayment } from "../../types";

export class BuyerModel {
  protected payment: TPayment | null = null;
  protected email: string = "";
  protected phone: string = "";
  protected address: string = "";

  setPayment(value: TPayment): void {
    this.payment = value;
  }

  setEmail(value: string): void {
    this.email = value;
  }

  setPhone(value: string): void {
    this.phone = value;
  }

  setAddress(value: string): void {
    this.address = value;
  }

  getData(): IBuyer {
    return {
      payment: this.payment,
      email: this.email,
      phone: this.phone,
      address: this.address,
    };
  }

  clear(): void {
    this.payment = null;
    this.email = "";
    this.phone = "";
    this.address = "";
  }

  validate(): TBuyerErrors {
    const errors: TBuyerErrors = {};
    if (!this.payment) errors.payment = "Не выбран вид оплаты";
    if (!this.email) errors.email = "Укажите E-mail";
    if (!this.phone) errors.phone = "Укажите номер телефона";
    if (!this.address) errors.address = "Укажите адрес доставки";
    return errors;
  }
}

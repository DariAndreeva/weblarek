import { IBuyer, TBuyerErrors, TPayment } from "../../types";
import { EventEmitter } from "../base/Events";

export class BuyerModel {
  protected payment: TPayment | null = null;
  protected email: string = "";
  protected phone: string = "";
  protected address: string = "";

  protected events: EventEmitter;

  constructor(events: EventEmitter) {
    this.events = events;
  }

  setPayment(value: TPayment): void {
    this.payment = value;
    this.notifyChange();
  }

  setEmail(value: string): void {
    this.email = value;
    this.notifyChange();
  }

  setPhone(value: string): void {
    this.phone = value;
    this.notifyChange();
  }

  setAddress(value: string): void {
    this.address = value;
    this.notifyChange();
  }

  protected notifyChange(): void {
    this.events.emit("покупатель:изменился", this.getData());
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
    this.notifyChange();
  }

  validate(): TBuyerErrors {
    const errors: TBuyerErrors = {};
    if (!this.payment) errors.payment = "Не выбран вид оплаты";
    if (!this.email) errors.email = "Укажите E-mail";
    if (!this.phone) errors.phone = "Укажите номер телефона";

    if (!this.address) errors.address = "Необходимо указать адрес";

    return errors;
  }
}

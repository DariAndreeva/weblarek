import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

export class Success extends Component<void> {
  constructor(container: HTMLElement, events: IEvents) {
    super(container);

    const closeBtn = container.querySelector<HTMLElement>(
      ".order-success__close",
    );
    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        events.emit("успех:закрыто", {});
      });
    }

    // set total(value: number) {
    //   const desc = this.container.querySelector<HTMLElement>('.order-success__description');
    //   if(desc) {
    //     desc.textContent = `Списано ${value} синапсов`
    //   }
    // }
  }
}

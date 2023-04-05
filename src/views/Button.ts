export class Button {
  constructor(public content: string) {}

  public render(): Node {
    const button = document.createElement("button");
    button.className = "btn";
    button.textContent = this.content;
    return button;
  }
}

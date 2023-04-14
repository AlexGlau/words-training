export class Button {
  constructor(public content: string, public cls: string) {}

  public render(): Node {
    const button = document.createElement("button");
    button.className = `btn btn-primary ${this.cls}`;
    button.textContent = this.content;

    return button;
  }
}

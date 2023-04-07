export class Button {
  constructor(
    public content: string,
    public callback: (e: MouseEvent) => void,
    public cls: string
  ) {}

  public render(): Node {
    const button = document.createElement("button");
    button.className = `btn btn-primary ${this.cls}`;
    button.textContent = this.content;
    button.addEventListener("click", this.callback);

    return button;
  }
}

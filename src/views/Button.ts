export class Button {
  constructor(
    public content: string,
    public callback: (e: MouseEvent) => void
  ) {}

  public render(): Node {
    const button = document.createElement("button");
    button.className = "btn";
    button.textContent = this.content;
    button.addEventListener("click", this.callback);

    return button;
  }
}

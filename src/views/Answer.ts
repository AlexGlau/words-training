export class Answer {
  constructor(public content: string) {}

  public render(): string {
    return `<span class="alert-success">${this.content}</span>`;
  }
}

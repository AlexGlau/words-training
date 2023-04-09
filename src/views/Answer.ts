export class Answer {
  constructor(public content: string) {}

  public render(): Node {
    const answer = document.createElement("span");
    answer.className = "btn mt-auto mb-auto alert-success";
    answer.textContent = this.content;

    return answer;
  }
}

import { Button } from "./Button";
import { Answer } from "./Answer";
import { Stat } from "./Stat";

import { ITraining, ICurrentWord, IStat } from "../types/types";

export class Training implements ITraining {
  public clickCount = 0;
  private letters = document.getElementById("letters");
  private answer = document.getElementById("answer");
  private currentQuestion = document.getElementById("current_question");

  public renderNumberOfWords(value: string): void {
    document.getElementById("total_questions").innerHTML = value;
  }

  public render(word: ICurrentWord): void {
    this.letters.innerHTML = "";

    const { options, numberOfErrors } = word;

    const cls = numberOfErrors === 3 ? "btn-danger" : "";

    options.forEach((letter): void => {
      this.letters.appendChild(new Button(letter, cls).render());
    });
  }

  public renderAnswers(letter: string): void {
    if (letter !== "") {
      this.answer.appendChild(new Answer(letter).render());
    } else {
      this.answer.innerHTML = "";
    }
  }

  public setNumberOfCurrentWord(numberOfWord: string): void {
    this.currentQuestion.innerHTML = numberOfWord;
  }

  public renderStat(statistics: IStat): void {
    this.letters.classList.replace("d-flex", "d-none");
    this.answer.classList.replace("d-flex", "d-none");

    new Stat(statistics).render();
  }

  public onAnswer(handler: (s: string) => void): void {
    this.letters.addEventListener("click", (e: MouseEvent): void => {
      handler((e.target as HTMLButtonElement).innerHTML);
    });

    document.addEventListener("keydown", (e: KeyboardEvent): void => {
      handler(e.key);
    });
  }
}
